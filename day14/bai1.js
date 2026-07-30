const check = (fullName) => {
  for (let i = 0; i < fullName.length; i++) {
    if (fullName[i] === " ") {
      fullName[i + 1].toUpperCase();
    }
  }
  console.log(fullName);
};
check("Dang q");
