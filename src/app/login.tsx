import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { mockUsers } from '../data/mockUsers';
import TopLoadingBar from '../components/TopLoadingBar';

export default function LoginScreen() {
  // mode 決定現在是「登入」還是「註冊」
  const [mode, setMode] = useState<'login' | 'register'>('login');
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
      setIsLoading(true);  // 載入條
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
    // 目前先設定延遲 1 秒後換過去，還沒接後端載入前會更有感覺一點
    setIsLoading(true);  // 載入條
    setTimeout(() => {
      router.replace({ pathname: '/home', params: { name: user.name } });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TopLoadingBar visible={isLoading} />
      <Text style={styles.title}>{isRegister ? '建立帳號' : '歡迎回來'}</Text>

      <TextInput
        style={styles.input}
        placeholder="電子郵件"
        placeholderTextColor="#9ca3af"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="密碼"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Pressable style={styles.button} onPress={handleSubmit} disabled={isLoading}>
        <Text style={styles.buttonText}>{isRegister ? '註冊' : '登入'}</Text>
      </Pressable>

      {/* 切換登入 / 註冊 */}
      <Pressable onPress={() => setMode(isRegister ? 'login' : 'register')}>
        <Text style={styles.switchText}>
          {isRegister ? '已經有帳號？登入' : '還沒有帳號？註冊'}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.switchText}>返回</Text>
      </Pressable>
    </View>
  );
}
// 上面的 disabled={isLoading} 讓按鈕按下後鎖住按鈕，避免跑完後因為按多次按鈕而重複執行 router.replace，到時候後端也需要這個

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#1e1b3a',
  },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 24 },
  input: {
    padding: 14,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
  },
  button: {
    marginTop: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#8b5cf6',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  switchText: { marginTop: 16, textAlign: 'center', color: '#c4b5fd' },
});