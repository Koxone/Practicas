function loadScript(scriptName) {
    let script = document.createElement("script");
    script.src = scriptName;
    script.onload = () => console.log(`${scriptName} cargado.`);
    document.body.appendChild(script);
}
loadScript()


document.getElementById('newGameCPUButton').addEventListener('click', function () {
    localStorage.setItem('gameMode', 'vsPlayer'); 
    loadScript('vsPlayer.js'); 
});

document.getElementById('newGamePlayerButton').addEventListener('click', function () {
    localStorage.setItem('gameMode', 'vsCPU'); 
    loadScript('vsCPU.js'); 
});
