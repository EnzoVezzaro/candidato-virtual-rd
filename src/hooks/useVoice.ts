import { useState, useEffect, useCallback, useRef } from 'react';
import candidateConfig from '@/config/candidate.config';
import { experimental_generateSpeech as generateSpeech } from 'ai';
import { createHume, hume } from '@ai-sdk/hume';
import { createLMNT, lmnt } from '@ai-sdk/lmnt';

type VoiceState = {
  isListening: boolean;
  isSpeaking: boolean;
  transcript: string;
  error: string | null;
};

const useVoice = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to store the Audio object
  const [state, setState] = useState<VoiceState>({
    isListening: false,
    isSpeaking: false,
    transcript: '',
    error: null,
  });
  
  // Check if voice is enabled in config
  const voiceEnabled = candidateConfig.voiceEnabled && candidateConfig.voiceConfig.output.provider !== 'none';
  
  // Speech recognition setup
  useEffect(() => {
    if (!voiceEnabled) return;
    
    // This is just a placeholder. In production, you would implement:
    // 1. Browser's SpeechRecognition API for basic voice input
    // 2. Integration with voice providers based on config
    
    // Cleanup function
    return () => {
      // Cleanup speech recognition if needed
      stopSpeaking(); // Stop any ongoing speech on unmount or when voice is disabled
    };
  }, [voiceEnabled]); // We'll handle the dependencies properly below
  
  const startListening = useCallback(() => {
    if (!voiceEnabled) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setState(prev => ({ ...prev, error: 'Speech recognition is not supported in this browser.' }));
      return;
    }

    try {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();

        console.log('recognition: ', recognition);
      recognition.lang = "es-ES";
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log('transcript: ', transcript);
        setState(prev => ({ ...prev, transcript: transcript, isListening: true }));
      };

      recognition.onstart = () => {
        console.log('listening start...');
        setState(prev => ({ ...prev, isListening: true }));
      };

      recognition.onend = () => {
        console.log('listening stop...');
        setState(prev => ({ ...prev, isListening: false }));
      };

      recognition.onerror = (event: any) => {
        console.log('listening error: ', event);
        setState(prev => ({ ...prev, error: `Error occurred in recognition: ${event.error}` }));
      };

      recognition.start();
    } catch (error: any) {
      setState(prev => ({ ...prev, error: `Error starting recognition: ${error.message}` }));
    }
  }, [voiceEnabled]);
  
  // Stop listening
  const stopListening = useCallback(() => {
    if (!voiceEnabled) return;
    
    setState(prev => ({ ...prev, isListening: false }));
    
    // In production: Stop speech recognition
  }, [voiceEnabled]);

  // Function to stop current speech playback
  const stopSpeaking = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ''; // Clear source to prevent potential memory leaks
      // Assuming audioUrl was created with URL.createObjectURL, revoke it here if accessible
      // If audioUrl is not accessible here, it should be revoked in onended/onerror
      audioRef.current = null;
      setState(prev => ({ ...prev, isSpeaking: false }));
      console.log('Speech stopped.');
    }
  }, []);

  // Move this outside the speak callback to comply with React Hook rules
  const browserFallbackSpeech = useCallback((fallbackText: string) => {
    console.log("Using browser speech synthesis fallback");
    
    // Check if speech synthesis is available
    if (!window.speechSynthesis) {
      console.error("Speech synthesis not available in this browser");
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        error: "Síntesis de voz no disponible en este navegador"
      }));
      return;
    }
    
    try {
      // Sanitize fallbackText to remove markdown
      const sanitizedText = fallbackText.replace(/[*_~`>#+-]/g, '');

      // Create and configure utterance
      const utterance = new SpeechSynthesisUtterance(sanitizedText);
      utterance.lang = 'es-ES';
      utterance.volume = 1.0; // Maximum volume
      
      // Get available voices (optional but helpful)
      const voices = window.speechSynthesis.getVoices();
      // Try to find a Spanish voice
      const spanishVoice = voices.find(voice => voice.lang.includes('es') && voice.voiceURI === "Shelley (Spanish (Mexico))");
      if (spanishVoice) {
        // console.log("Using Spanish voice:", spanishVoice.name);
        utterance.voice = spanishVoice;
      }
      
      // Event handlers
      utterance.onstart = () => console.log("Browser speech started");
      utterance.onend = () => {
        setState(prev => ({ ...prev, isSpeaking: false }));
      };
      utterance.onerror = (event) => {
        // console.error("Browser speech synthesis error:", event);
        setState(prev => ({
          ...prev,
          isSpeaking: false,
          error: `Error en la síntesis de voz: ${event.error}`
        }));
      };
      
      // Sometimes voices aren't loaded immediately
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = () => {
          const updatedVoices = speechSynthesis.getVoices();
          const updatedSpanishVoice = updatedVoices.find(voice => voice.lang.includes('es'));
          if (updatedSpanishVoice) utterance.voice = updatedSpanishVoice;
          speechSynthesis.speak(utterance);
        };
      } else {
        // Speak now if voices are already loaded
        speechSynthesis.speak(utterance);
      }
      
    } catch (fallbackError) {
      console.error("Fallback speech synthesis failed:", fallbackError);
      setState(prev => ({
        ...prev,
        isSpeaking: false,
        error: "Error en todos los sistemas de síntesis de voz"
      }));
    }
  }, []);

  // Speak text
  const speak = useCallback(async (text: string) => {
    if (!voiceEnabled) return;

    stopSpeaking(); // Stop any previous speech before starting new one

    setState(prev => ({ ...prev, isSpeaking: true, error: null })); // Reset error on new speech

    try {
      const { provider, voiceId, apiKey } = candidateConfig.voiceConfig.output;
      
      if (provider === 'elevenlabs') {
        // ElevenLabs implementation
        const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
        const headers = {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        };

        const body = JSON.stringify({
          text: text,
          model_id: "eleven_flash_v2_5",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        });

        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body
        });

        if (!response.ok) {
          throw new Error(`ElevenLabs API error: ${response.status} ${response.statusText}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audio.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ 
            ...prev, 
            isSpeaking: false,
            error: "Error al reproducir el audio"
          }));
          audioRef.current = null;
        };
        audio.play();

      } else if (provider === 'google') {
        // Google TTS implementation
        const response = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${candidateConfig.voiceConfig.output.apiKey}`
          },
          body: JSON.stringify({
            input: { text },
            voice: { languageCode: 'es-ES' },
            audioConfig: { audioEncoding: 'MP3' }
          })
        });
        const data = await response.json();
        const audioBytes = Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0));
        const audioBlob = new Blob([audioBytes], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audio.play();

      } else if (provider === 'openai') {
        // OpenAI TTS implementation
        const response = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${candidateConfig.voiceConfig.output.apiKey}`
          },
          body: JSON.stringify({
            model: "tts-1",
            voice: "alloy",
            input: text
          })
        });
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audio.play();

      } else if (provider === 'hume') {
        const hume = createHume({
          apiKey: apiKey
        });
        const result = await generateSpeech({
          model: hume.speech(),
          text: text,
          voice: voiceId || 'd8ab67c6-953d-4bd8-9370-8fa53a0f1453',
          providerOptions: { hume: {} }
        });

        // Ensure result.audio contains the expected Uint8Array
        if (!result.audio || !(result.audio.uint8Array instanceof Uint8Array)) {
          throw new Error('Hume API did not return valid audio data.');
        }

        const audioBlob = new Blob([result.audio.uint8Array], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioRef.current = audioElement;
        audioElement.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audioElement.play();

      } else if (provider === 'aurora') {
        
        const lmnt = createLMNT({
          apiKey: apiKey
        });
        const result = await generateSpeech({
          model: lmnt.speech('aurora'),
          text: text,
          providerOptions: { lmnt: { language: 'es' } }
        });

        // Ensure result.audio contains the expected Uint8Array
        if (!result.audio || !(result.audio.uint8Array instanceof Uint8Array)) {
           throw new Error('Aurora API did not return valid audio data.');
        }

        const audioBlob = new Blob([result.audio.uint8Array], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audioElement = new Audio(audioUrl);
        audioRef.current = audioElement;

        audioElement.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audioElement.play();

      } else if (provider === 'huggingface') {
        // HuggingFace TTS implementation
        const url = `https://api-inference.huggingface.co/models/${voiceId}`; // Use voiceId as model name
        const headers = {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        };

        const body = JSON.stringify({
          inputs: text,
        });

        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: body
        });

        if (!response.ok) {
          throw new Error(`HuggingFace API error: ${response.status} ${response.statusText}`);
        }

        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onended = () => {
          URL.revokeObjectURL(audioUrl);
          setState(prev => ({ ...prev, isSpeaking: false }));
          audioRef.current = null;
        };
        audio.play();

      } else {
        browserFallbackSpeech(text);
      }
    } catch (error) {
      console.error("Speech synthesis error:", error);

      if (text) {
        browserFallbackSpeech(text);
      } else {
        // Ensure speaking state is false if an error occurs before playback starts
        if (audioRef.current) {
          audioRef.current = null;
        }
        setState(prev => ({
          ...prev,
          isSpeaking: false,
          error: `Error en la síntesis de voz: ${error.message}`
        }));
      }
    }
  }, [voiceEnabled, stopSpeaking, browserFallbackSpeech]);

  // Fix the useEffect dependency array
  useEffect(() => {
    if (!voiceEnabled) return;
    
    return () => {
      stopSpeaking(); // Stop any ongoing speech on unmount or when voice is disabled
    };
  }, [voiceEnabled, stopSpeaking]);

  return {
    ...state,
    voiceEnabled,
    startListening,
    stopListening,
    speak,
    stopSpeaking // Return the stop function
  };
};

export default useVoice;
