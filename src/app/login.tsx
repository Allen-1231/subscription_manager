import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { mockUsers } from '../data/mockUsers';
import TopLoadingBar from '../components/TopLoadingBar';

export default function LoginScreen() {
  const { mode: initialMode } = useLocalSearchParams<{ mode?: string }>();
  const insets = useSafeAreaInsets();

  // mode 決定現在是「登入」還是「註冊」
  const [mode, setMode] = useState<'login' | 'register'>(
    initialMode === 'register' ? 'register' : 'login'
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isRegister = mode === 'register';

  const handleSubmit = () => {
    // 檢查欄位不能空白
    if (!email.trim() || !password) {
      Alert.alert('請填寫完整', '電子郵件與密碼都要輸入');
      return;
    }
    // 註冊：先假裝成功，名稱取 email「@」前面的部分
    if (isRegister) {
      setIsLoading(true);
      setTimeout(() => {
        router.replace({ pathname: '/home', params: { name: email.split('@')[0] } });
      }, 1000);
      return;
    }
    // 登入：在假帳號中尋找 email 與密碼都相符的人
    const user = mockUsers.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      Alert.alert('登入失敗', '帳號或密碼錯誤');
      return;
    }

    // 成功：換到首頁，並把這個帳號的名稱帶過去
    setIsLoading(true);
    setTimeout(() => {
      router.replace({ pathname: '/home', params: { name: user.name } });
    }, 1000);
  };

  return (
    <LinearGradient
      colors={["#0f0c29", "#302b63", "#24243e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { paddingBottom: Math.max(insets.bottom, 24) + 16 }]}
    >
      <TopLoadingBar visible={isLoading} />

      {/* 上方標題 */}
      <View style={styles.headerSection}>
        <Text style={styles.icon}>{isRegister ? '✨' : '👋'}</Text>
        <Text style={styles.title}>{isRegister ? '建立帳號' : '歡迎回來'}</Text>
        <Text style={styles.subtitle}>
          {isRegister ? '建立帳號以開始管理訂閱' : '登入以管理您的訂閱'}
        </Text>
      </View>

      {/* 中間表單 */}
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          placeholder="電子郵件"
          placeholderTextColor="rgba(255,255,255,0.35)"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="密碼"
          placeholderTextColor="rgba(255,255,255,0.35)"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          <LinearGradient
            colors={["#6366f1", "#a855f7", "#ec4899"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>{isRegister ? '註冊' : '登入'}</Text>
          </LinearGradient>
        </Pressable>
      </View>

      {/* 下方切換與返回 */}
      <View style={styles.footerSection}>
        <Pressable onPress={() => setMode(isRegister ? 'login' : 'register')}>
          <Text style={styles.switchText}>
            {isRegister ? '已經有帳號？登入' : '還沒有帳號？註冊'}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.backText}>← 返回</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#e0e0ff',
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.4)',
    marginTop: 8,
    letterSpacing: 0.3,
  },
  formSection: {
    width: '100%',
    gap: 12,
  },
  input: {
    padding: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    color: 'white',
    fontSize: 16,
  },
  button: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerSection: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  switchText: {
    textAlign: 'center',
    color: '#c4b5fd',
    fontSize: 14,
  },
  backText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.35)',
    fontSize: 14,
  },
});
