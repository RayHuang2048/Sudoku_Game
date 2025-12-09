import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

let audioContext: AudioContext | null = null;

// 初始化音效
export const initializeSound = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });
  } catch (error) {
    // 靜默處理錯誤
  }
  
  // 在 Web 平台上初始化 AudioContext
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    try {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      // 靜默處理
    }
  }
};

// 播放點擊音效
export const playClickSound = async () => {
  // 在 Web 平台上使用 Web Audio API 生成音效
  if (Platform.OS === 'web' && audioContext) {
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800; // 頻率
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // 靜默處理
    }
  }
  
  // 在移動平台上使用觸覺反饋
  if (Platform.OS !== 'web') {
    try {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      // 靜默處理
    }
  }
};

// 清理音效資源
export const cleanupSound = async () => {
  if (audioContext && Platform.OS === 'web') {
    try {
      await audioContext.close();
      audioContext = null;
    } catch (error) {
      // 靜默處理
    }
  }
};

