const generateLobbyID = () => {
  const letters = ["A", "B", "C", "X", "F", "Y", "W"];

  //const seed = Math.floor(Math.random() * 100) + 1;
    let seed = '';

    for(let i = 0; i < 6; i++) {
        seed += letters[Math.floor(Math.random() * --letters.length)]
    }

  console.log(seed);
  return seed;
};

export default generateLobbyID;
