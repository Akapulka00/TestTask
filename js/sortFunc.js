export function sortByName( arr, flag=0){//сортировка по имени
  let buff=1;
  if(flag!==0){
    buff=-1;
  }
  arr=arr.sort(function(a, b){
    if(a.name.firstName < b.name.firstName) return -1*buff;
    if(a.name.firstName > b.name.firstName) return 1*buff;
    return 0;
  });
  return arr;
}
export function sortByLastName( arr, flag=0){//сортировка по Фамилии
  let buff=1;
  if(flag!==0){
    buff=-1;
  }
  arr=arr.sort(function(a, b){
    if(a.name.lastName < b.name.lastName) return -1*buff;
    if(a.name.lastName > b.name.lastName) return 1*buff;
    return 0;
  });
  return arr;
}
export function sortByColor( arr, flag=0){//сортировка по Фамилии
  let buff=1;
  if(flag!==0){
    buff=-1;
  }
  arr=arr.sort(function(a, b){
    if(a.eyeColor < b.eyeColor) return -1*buff;
    if(a.eyeColor > b.eyeColor) return 1*buff;
    return 0;
  });
  return arr;
}
export function sortByLength( arr, flag=0){//сортировка по Фамилии
  let buff=1;
  if(flag!==0){
    buff=-1;
  }
  arr=arr.sort(function(a, b){
    return (b.about.length - a.about.length) *buff;
  });
  return arr;
}

