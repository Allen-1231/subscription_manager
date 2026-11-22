// 假帳號，只用來測試登入流程。後端完成後整個檔案會刪掉
export type MockUser = {
  email: string;
  password: string;
  name: string;
};

export const mockUsers: MockUser[] = [
  { email: 'amy@test.com', password: '123456', name: 'Amy' },
  { email: 'ben@test.com', password: '123456', name: 'Ben' },
];