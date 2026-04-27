// src/components/ConfirmModal.tsx
// Cross-platform modal pengganti Alert.alert (berfungsi di web & native)

import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import Colors from '../constants/colors';

interface ModalButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  message?: string;
  buttons: ModalButton[];
  onDismiss?: () => void;
}

export default function ConfirmModal({
  visible,
  title,
  message,
  buttons,
  onDismiss,
}: ConfirmModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.buttonRow}>
            {buttons.map((btn, idx) => (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.button,
                  btn.style === 'cancel' && styles.cancelBtn,
                  btn.style === 'destructive' && styles.destructiveBtn,
                  btn.style === 'default' && styles.defaultBtn,
                ]}
                activeOpacity={0.82}
                onPress={() => {
                  btn.onPress?.();
                }}
              >
                <Text
                  style={[
                    styles.buttonText,
                    btn.style === 'cancel' && styles.cancelText,
                    btn.style === 'destructive' && styles.destructiveText,
                    btn.style === 'default' && styles.defaultText,
                  ]}
                >
                  {btn.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginTop: 4,
  },
  button: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
  },
  defaultBtn: {
    backgroundColor: Colors.primary,
  },
  destructiveBtn: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  cancelText: {
    color: Colors.textSecondary,
  },
  defaultText: {
    color: '#fff',
  },
  destructiveText: {
    color: '#fff',
  },
});
