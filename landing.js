document.getElementById("openBtn").addEventListener("click", () => {
  const gender = document.getElementById("genderSelect").value;
  const level = document.getElementById("levelSelect").value;
  const apparatus = document.getElementById("apparatusSelect").value;
  const group = document.getElementById("groupSelect").value;

  const params = new URLSearchParams({
    gender,
    level,
    apparatus,
    group
  });
window.location.href = "judge.html?gender=Girls&level=Level+1&apparatus=Vault&group=Group+D";
});