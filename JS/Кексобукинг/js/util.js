const beginFEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOSARRAY = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//Ф-ция создания случайного целого числа
function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

//Ф-ция выбора случайного эл-та из массива
const newElement = function(arr) {
  let dublArr=[];
  arr.forEach(function(item){
    dublArr.push(item)});
  const count=getRandom(0,arr.length);
  return dublArr.splice(count,1);
}

//Ф-ция создания случайного числа с плав. точкой (5 знаков после точки)
function getRandomLocation(min,max){
  return parseFloat(Math.random() * (max - min) + min).toFixed(5);
}

////Ф-ция выборки из массива случайных удобств, которые не повторяются
function getFeatures(){
  let count = getRandom(1,7);
  let choiseFeatures=[];

  for (let i=0; i<=count; i++){
    let text= newElement(beginFEATURES).join();
    if (choiseFeatures.includes(text)){
      text= newElement(beginFEATURES).join();
    }else{
      choiseFeatures.push(text);
    }
  }
  return choiseFeatures;
}

////Ф-ция выборки из массива фотографий, которые не повторяются
function getPhotos(){
  let count = getRandom(1,4);
  let choisePhoto=[];

  for (let i=1; i<=count; i++){
    let text= newElement(PHOTOSARRAY).join();
    while (choisePhoto.includes(text)){
      text= newElement(PHOTOSARRAY).join();
    }
    choisePhoto.push(text);

  }
  return choisePhoto;
}


export {getRandom, newElement, getRandomLocation, getFeatures, getPhotos};
