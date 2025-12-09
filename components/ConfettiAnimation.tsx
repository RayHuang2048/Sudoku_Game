import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

interface ConfettiPiece {
  id: number;
  x: Animated.Value;
  y: Animated.Value;
  rotation: Animated.Value;
  color: string;
  size: number;
}

interface ConfettiAnimationProps {
  visible: boolean;
  onComplete?: () => void;
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ visible, onComplete }) => {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([]);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (visible) {
      // 創建拉炮粒子
      const pieces: ConfettiPiece[] = [];
      const particleCount = 50;

      for (let i = 0; i < particleCount; i++) {
        pieces.push({
          id: i,
          x: new Animated.Value(width / 2),
          y: new Animated.Value(height / 2),
          rotation: new Animated.Value(0),
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: Math.random() * 8 + 4,
        });
      }

      setConfettiPieces(pieces);

      // 使用 setTimeout 確保狀態更新後再開始動畫
      setTimeout(() => {
        // 創建動畫
        const animations = pieces.map((piece) => {
          const angle = (Math.PI * 2 * piece.id) / particleCount;
          const distance = 200 + Math.random() * 200;
          const duration = 2000 + Math.random() * 1000;

          return Animated.parallel([
            Animated.timing(piece.x, {
              toValue: width / 2 + Math.cos(angle) * distance,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(piece.y, {
              toValue: height / 2 + Math.sin(angle) * distance - 100,
              duration,
              useNativeDriver: true,
            }),
            Animated.timing(piece.rotation, {
              toValue: Math.random() * 720 - 360,
              duration,
              useNativeDriver: true,
            }),
          ]);
        });

        animationRef.current = Animated.parallel(animations);
        animationRef.current.start(() => {
          if (onComplete) {
            onComplete();
          }
        });
      }, 50);
    } else {
      // 重置動畫
      if (animationRef.current) {
        animationRef.current.stop();
      }
      setConfettiPieces([]);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [visible, onComplete]);

  if (!visible || confettiPieces.length === 0) return null;

  return (
    <View style={styles.container} pointerEvents="none">
      {confettiPieces.map((piece) => {
        const rotate = piece.rotation.interpolate({
          inputRange: [0, 360],
          outputRange: ['0deg', '360deg'],
        });

        return (
          <Animated.View
            key={piece.id}
            style={[
              styles.confetti,
              {
                backgroundColor: piece.color,
                width: piece.size,
                height: piece.size,
                transform: [
                  { translateX: piece.x },
                  { translateY: piece.y },
                  { rotate },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  confetti: {
    position: 'absolute',
    borderRadius: 2,
  },
});

