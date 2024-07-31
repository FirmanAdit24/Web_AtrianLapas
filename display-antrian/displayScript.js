const antrianDis = document.getElementById("antrian-disabilitas");
const antrianKun = document.getElementById("antrian-kunjungan");
const antrianTitipanBrg = document.getElementById("antrian-titipan");
const yankomas = document.getElementById("antrian-yankomas");

const tingtung = document.getElementById("tingtung");
const tungting = document.getElementById("tungting");

let suaraBunyi = 0
function getData() {
    const services = [
        { ref: "layananDisabilitas", element: antrianDis },
        { ref: "layananKunjungan", element: antrianKun },
        { ref: "layananTitipanBrg", element: antrianTitipanBrg },
        { ref: "yankomas", element: yankomas }
    ];
    services.forEach(service => {
        firebase.database().ref("antrian").child(service.ref).orderByChild("timestamp").on("value", (snap) => {
            
            snap.forEach((data) => {
                if (data.val().status == 1) {
                    service.element.innerHTML = data.val().noAntrian;
                }
                if (data.val().soundState == 1) {

                    if(suaraBunyi == 0){
                        playCall(data.val().noAntrian, () => {
                            console.log("berhasil");
                            tungting.play();
                            firebase.database().ref(`antrian/${service.ref}`).child(data.key).set({
                                timestamp: Date.now(),
                                noAntrian: data.val().noAntrian,
                                status: 1,
                                soundState: 0,
                            });
                            tungting.addEventListener("ended", ()=>{
                                   service.element.parentElement.style.background = "white"
                        service.element.parentElement.style.color = "black"
                            })
                        }, data.val().loket);
                        service.element.parentElement.style.background = "#00aa9d"
                        service.element.parentElement.style.color = "white"
                    }else{
                        firebase.database().ref(`antrian/${service.ref}`).child(data.key).set({
                            timestamp: Date.now(),
                            noAntrian: data.val().noAntrian,
                            status: 1,
                            soundState: 0,
                        });
                    }
                    // if(service.element.innerHTML == data.val().noAntrian){
                    // }
                }
      
       
            });

    
           
        });
    });
}





document.addEventListener("DOMContentLoaded", () => {
    getData();
});

const audioKata = [
    new Audio('../audio/kata/Menuju.wav'),
    new Audio('../audio/kata/Nomor_antrian.wav'),
    new Audio('../audio/kata/di_loket.wav'),
    new Audio('../audio/kata/ke_loket.wav'),
    
];

const audioAngka = Array.from({ length: 12 }, (_, i) => new Audio(`../audio/angka/${i}.wav`)).concat([
    new Audio('../audio/angka/belas.wav'),
    new Audio('../audio/angka/puluh.wav'),
    new Audio('../audio/angka/ratus.wav'),
    new Audio('../audio/angka/seratus.wav')
]);

const audioHuruf = ['A', 'B', 'C', 'D'].map(letter => new Audio(`../audio/huruf/${letter}.wav`));

for(i = 0 ; i < audioKata.length; i++){
    for(j = 0 ; j < audioHuruf.length; j++){
        for(x = 0 ; x < audioAngka.length; x++){
         
        tingtung.addEventListener("play", () => {
           suaraBunyi = 1
        })
            // jika suara bunyi
        audioKata[i].addEventListener("play", () => {
           suaraBunyi = 1
        })
        audioHuruf[j].addEventListener("play", () => {
            suaraBunyi = 1

        })
        audioAngka[x].addEventListener("play", () => {
            suaraBunyi = 1

        })
        
        // jika suara diam
        tingtung.addEventListener("ended", () => {
            suaraBunyi = 0
         })
        audioKata[i].addEventListener("ended", () => {
           suaraBunyi = 0
            
        })
        audioHuruf[j].addEventListener("ended", () => {
            suaraBunyi = 0
          
        })
        audioAngka[x].addEventListener("ended", () => {
            suaraBunyi = 0
          
        })
        }
      
    }



}



function playCall(noAntrian, callback, loket) {
    const queue = [];

    tingtung.play();
    tingtung.addEventListener("ended", function () {
        queue.push(audioKata[1]);

        const huruf = noAntrian.charAt(0).toUpperCase();
        const hurufIndex = ['A', 'B', 'C', 'D'].indexOf(huruf);
        if (hurufIndex >= 0) queue.push(audioHuruf[hurufIndex]);

        const angka = noAntrian.substring(1);
        console.log(angka)

        // Menyusun angka ratusan, puluhan dan satuan
        for (let i = 0; i < angka.length; i++) {
   
            queue.push(audioAngka[parseInt(angka.charAt(i))])
        }

        queue.push(audioKata[0]);
        if(loket != 0){
            queue.push(audioKata[3]);
            queue.push(audioAngka[loket])
        }else{
            queue.push(audioKata[2]);
        }

        function playQueue(index) {
            if (index < queue.length) {
                queue[index].play();
                queue[index].onended = () => playQueue(index + 1);
            } else {
                callback();
            }
        }

        playQueue(0);
    });
}
