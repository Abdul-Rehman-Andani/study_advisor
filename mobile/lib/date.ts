export const getGreeting = () => {
  const hour = new Date().getHours(); // 0 - 23
  if (hour >= 6 && hour < 16) {
    return "Good Morning";
  } else {
    return "Good Evening";
  }
};

