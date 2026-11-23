import { Redirect, useLocalSearchParams } from "expo-router";

/**
 * home.tsx 作為路由中繼站，將登入成功後的路由
 * 轉發到 (tabs) 佈局，並把 name 參數帶過去。
 */
export default function HomeRedirect() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return <Redirect href={{ pathname: "/(tabs)/index" as any, params: { name: name || "使用者" } }} />;
}
