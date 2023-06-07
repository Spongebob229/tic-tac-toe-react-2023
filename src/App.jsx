import { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import Zagruzka from "./components/Zagruzka";
import Grid from "./components/Grid";
import Result from "./components/Result";

function App() {
  const [res, setRes] = useState("");
  const [grid, setGrid] = useState([
    { id: 1, text: "" },
    { id: 2, text: "" },
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 6, text: "" },
    { id: 7, text: "" },
    { id: 8, text: "" },
    { id: 9, text: "" },
  ]);



  const [user, setUser] = useState(true);
  

  function handlePlay(elementID) {
    
    //NO NO push splice pop shift unshift
    //OK map forEach slice  filter find some
    const newGrid = grid.map((item) => {
      if (item.id === elementID && !item.text) {
        return { ...item, text: user ? "X" : "O" };
      } else return item;
    });
    setUser(!user);
    setGrid(newGrid);

    
  }
  
  useEffect(()=>{
    if(checkXWin() == true){
      console.log('X');
      setRes('X win');
    }
    else if(checkOWin() == true){
      console.log('O');
      setRes('O win');
    }
    if(checkDraw() == true){
      console.log('Draw');
      setRes('Draw');
    }
  }, [grid])

    
  function checkXWin() {
      // Проверка горизонтальных линий
      for (let i = 0; i < 3; i++) {
        if (
          grid[i * 3].text === "X" &&
          grid[i * 3 + 1].text === "X" &&
          grid[i * 3 + 2].text === "X"
        )
        {
          return true;
        }
      }
    
      // Проверка вертикальных линий
      for (let i = 0; i < 3; i++) {
        if (
          grid[i].text === "X" &&
          grid[i + 3].text === "X" &&
          grid[i + 6].text === "X"
        ) {
          return true;
        }
      }
    
      // Проверка диагоналей
      if (
        (grid[0].text === "X" && grid[4].text === "X" && grid[8].text === "X") ||
        (grid[2].text === "X" && grid[4].text === "X" && grid[6].text === "X")
      ) {
        return true;
    }
    return false;
  }

  function checkOWin(board) {
    // Проверка горизонтальных линий
    for (let i = 0; i < 3; i++) {
      if (
        grid[i * 3].text === "O" &&
        grid[i * 3 + 1].text === "O" &&
        grid[i * 3 + 2].text === "O"
      ) {
        return true;
      }
    }
  
    // Проверка вертикальных линий
    for (let i = 0; i < 3; i++) {
      if (
        grid[i].text === "O" &&
        grid[i + 3].text === "O" &&
        grid[i + 6].text === "O"
      ) {
        return true;
      }
    }
  
    // Проверка диагоналей
    if (
      (grid[0].text === "O" && grid[4].text === "O" && grid[8].text === "O") ||
      (grid[2].text === "O" && grid[4].text === "O" && grid[6].text === "O")
    ) {
      return true;
    }
    return false;
  }

  function checkDraw() {
    // Проверка, есть ли пустые ячейки на игровом поле

    for(let i = 0; i < 9; i++){
      if(grid[i].text === ""){
        return false;
      }
    }
    
    // Проверка на отсутствие победителя
    if (!checkXWin() && !checkOWin()) {
      return true; // Нет победителя, ничья
    }
  
    return false; // Игра не окончена и нет ничьи
  }
  

  // if (!user) {
  //   return (
  //     <MainLayout>
  //       <Zagruzka />
  //     </MainLayout>
  //   );
  // }

  return (
    
    <MainLayout>
      <Grid grid={grid} handlePlay={handlePlay} res={res}/>
    </MainLayout>
  );
  }

export default App;
