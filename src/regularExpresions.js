const isMail = (mail) => {
    
    var patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patron.test(mail);
  };
  

const isCorrectPasword = (pasword) => {
    const patron = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
    return patron.test(pasword)
};

const confirmKeyGenerate = () => {
  let key = '';
  for (let i = 0; i < 6; i++) {
    const numeroAleatorio = Math.floor(Math.random() * 10);
    key += numeroAleatorio;
  }
  return key;
};


module.exports = {
    isMail,
    isCorrectPasword,
    confirmKeyGenerate,
}