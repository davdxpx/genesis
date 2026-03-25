"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';

export interface AudioState {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicIntensity: 'idle' | 'tense';
}

interface AudioContextType {
  audioState: AudioState;
  setMusicEnabled: (enabled: boolean) => void;
  setSfxEnabled: (enabled: boolean) => void;
  setMusicIntensity: (intensity: 'idle' | 'tense') => void;
  playSfx: (type: 'click' | 'type' | 'error' | 'success' | 'delete' | 'decision') => void;
  initAudio: (music: boolean, sfx: boolean) => void;
}

const defaultAudioState: AudioState = {
  musicEnabled: false,
  sfxEnabled: false,
  musicIntensity: 'idle',
};

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: ReactNode }) {
  const [audioState, setAudioState] = useState<AudioState>(defaultAudioState);
  const [isInitialized, setIsInitialized] = useState(false);

  const bgMusicLoopRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check localStorage on mount
    const savedMusic = localStorage.getItem('genesis_music_enabled');
    const savedSfx = localStorage.getItem('genesis_sfx_enabled');

    if (savedMusic !== null && savedSfx !== null) {
      setAudioState(prev => ({
        ...prev,
        musicEnabled: savedMusic === 'true',
        sfxEnabled: savedSfx === 'true'
      }));
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      bgMusicLoopRef.current = new Audio('/audio/Genesis_BackgroundLoop.mp3');
      bgMusicLoopRef.current.loop = true;
      bgMusicLoopRef.current.volume = 0.3;
    }

    return () => {
      if (bgMusicLoopRef.current) {
        bgMusicLoopRef.current.pause();
        bgMusicLoopRef.current = null;
      }
    };
  }, []);

  const updateMusicPlayback = () => {
    if (!isInitialized) return;

    if (!audioState.musicEnabled) {
      bgMusicLoopRef.current?.pause();
      return;
    }

    if (bgMusicLoopRef.current && bgMusicLoopRef.current.paused) {
      bgMusicLoopRef.current.play().catch(e => console.warn('Audio play blocked:', e));
    }
  };

  useEffect(() => {
    updateMusicPlayback();
  }, [audioState.musicEnabled, isInitialized]);

  const setMusicEnabled = (enabled: boolean) => {
    setAudioState(prev => ({ ...prev, musicEnabled: enabled }));
    localStorage.setItem('genesis_music_enabled', String(enabled));
  };

  const setSfxEnabled = (enabled: boolean) => {
    setAudioState(prev => ({ ...prev, sfxEnabled: enabled }));
    localStorage.setItem('genesis_sfx_enabled', String(enabled));
  };

  const setMusicIntensity = (intensity: 'idle' | 'tense') => {
    setAudioState(prev => ({ ...prev, musicIntensity: intensity }));
  };

  const playSfx = (type: 'click' | 'type' | 'error' | 'success' | 'delete' | 'decision') => {
    if (!audioState.sfxEnabled) return;

    let filename = `/audio/${type}.wav`;
    if (type === 'click') filename = '/audio/Genesis_Click.wav';
    if (type === 'decision') filename = '/audio/Genesis_ConfirmationClick.wav';

    const audio = new Audio(filename);

    if (type === 'type') audio.volume = 0.2;
    if (type === 'click') audio.volume = 0.5;

    audio.play().catch(e => console.warn('SFX play blocked:', e));
  };

  const initAudio = (music: boolean, sfx: boolean) => {
    setIsInitialized(true);
    setMusicEnabled(music);
    setSfxEnabled(sfx);

    if (music) {
      bgMusicLoopRef.current?.play().catch(e => console.warn('Audio play blocked on init:', e));
    }
  };

  return (
    <AudioContext.Provider value={{ audioState, setMusicEnabled, setSfxEnabled, setMusicIntensity, playSfx, initAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
