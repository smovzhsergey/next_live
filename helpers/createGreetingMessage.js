export const createGreetingMessage = (visitCounts) => {
  
  let message;

  if (visitCounts < 3 ) {
    message = "Приветствуем тебя странник!";
  } else if (visitCounts >= 3 && visitCounts < 5) {
    message = "Приветствуем тебя друг!";
  } else if (visitCounts >= 5) {
    message = "Добро пожаловать в семье!";
  }

  return message;  
};