const jumlahAntrian = document.getElementById("jumlah-antrian")
const antrianSekarang = document.getElementById("antrian-sekarang")
const antrianSelanjutnya = document.getElementById("antrian-selanjutnya")
const sisaAntrian = document.getElementById("sisa-antrian")

const tombolTintung = document.getElementById("test")
const tintung = document.getElementById("tingtung")
const tunting = document.getElementById("tungting")
const listAntrian = document.getElementById("listAntrian")
const listAntrianSelesai = document.getElementById("antrianSelesai")
const resetBtn = document.getElementById("reset-antrian")
const inputAntrian = document.getElementById("input-antrian");
const tombolInputAntrian = document.getElementById("tombol-input-antrian");

const numInput = document.getElementById("input-antrian")
const numInputBtn = document.getElementById("tombol-input-antrian")
const numInputBanyakBtn = document.getElementById("tombol-input-antrian-banyak")

const loketTersedia = document.getElementById("loketTersedia")
const loket1 = document.getElementById("loket1")
const loket2 = document.getElementById("loket2")
const loket3 = document.getElementById("loket3")
let loketValue = 0
loketTersedia.onclick = () => {
    loketTersedia.className = "btn btn-primary"
    loket1.className = "btn btn-secondary"
     loket2.className = "btn btn-secondary"
      loket3.className = "btn btn-secondary"
      loketValue = 0
}
loket1.onclick = () => {
     loketTersedia.className = "btn btn-secondary"
    loket1.className = "btn btn-primary"
     loket2.className = "btn btn-secondary"
      loket3.className = "btn btn-secondary"
      loketValue = 1
}
loket2.onclick = () => {
     loketTersedia.className = "btn btn-secondary"
    loket2.className = "btn btn-primary"
     loket1.className = "btn btn-secondary"
      loket3.className = "btn btn-secondary"
      loketValue = 2
}
loket3.onclick = () => {
     loketTersedia.className = "btn btn-secondary"
    loket3.className = "btn btn-primary"
     loket2.className = "btn btn-secondary"
      loket1.className = "btn btn-secondary"
      loketValue = 3
}

function insertData(){
    console.log(numInput.value)

       let noAntrian = ""
       switch(numInput.value.length){
           case 1 :{
              noAntrian = "C00"
              break
           }
           case 2 :{
              noAntrian = "C0"
              break
           }
           case 3 :{
              noAntrian = "C"
              break
           }
    }
    firebase.database().ref("antrian/layananTitipanBrg").child(numInput.value).set({
            'timestamp' : Date.now(),
            'noAntrian' : noAntrian+numInput.value ,
            'status' : 0,
            'soundState' : 0,
        })
    
}

async function manyInsert(total){
 
    let noAntrian = ""
    for(i = 0 ; i < parseInt(total); i++){
        switch((i+1).toString().length){
            case 1 :{
               noAntrian = "C00"
               break
            }
            case 2 :{
               noAntrian = "C0"
               break
            }
            case 3 :{
               noAntrian = "C"
               break
            }
        }
         await firebase.database().ref("antrian/layananTitipanBrg").child(i+1).set({
            'timestamp' : Date.now(),
            'noAntrian' : noAntrian+ (i+1),
            'status' : 0,
            'soundState' : 0,
            'loket' : 0
        })
    
    }

}

// document.getElementById("tombol-input-antrian-banyak").onclick = () =>{
//     manyInsert(numInput.value)
// }

const confirmBtn = document.getElementById('confirmBtn');
const entryCount = document.getElementById('entryCount');
let totalEntries = 0;

numInputBanyakBtn.onclick = () => {
    totalEntries = numInput.value;
    if (totalEntries === "" || totalEntries <= 0) {
        $('#inputErrorModal').modal('show');
        return;
    } else {
        entryCount.textContent = totalEntries;
        $('#confirmationModal').modal('show');
    }
};

confirmBtn.onclick = () => {
    $('#confirmationModal').modal('hide');
    manyInsert(totalEntries);
};

function getData(){
    firebase.database().ref("antrian").child("layananTitipanBrg").on("value", (snap) => {
        jumlahAntrian.innerHTML = snap.numChildren()
        antrianSekarang.innerHTML = "-"  // Ubah tampilan awal menjadi "-"
        listAntrian.innerHTML = ""
        listAntrianSelesai.innerHTML = ""
        sisaAntrian.innerHTML = 0
        var condition = 0
        var test = 0
        let hitungNilaiSoundState = 0
        let hitungNilai0 = 0
        let hitungNilai1 = 0
        let hitungNilai2 = 0


        for(const key in snap.val()){

            switch(snap.val()[key].status){
                case 0 :{
                   hitungNilai0++
                   break
                }
                case 1 :{
                 hitungNilai1++
                 break
                }
                case 2 :{
                   hitungNilai2++
                   break
                }
            }

            if(snap.val()[key].soundState == 1){
                hitungNilaiSoundState++
            }
        }

        if(hitungNilai0 == 0 && hitungNilai1 == 0){
            antrianSelanjutnya.innerHTML="-"
            listAntrian.innerHTML = (`
                <tr>
                    <th colspan="3" style="text-align:center">Semua antrian telah dipanggil/masih kosong!!</th>
                </tr>`)
        }
        if(hitungNilai0 == 0 ){
            antrianSelanjutnya.innerHTML ="-"

        }
        
        snap.forEach((data) => {
            switch(data.val().status){
                case 0: {
                    listAntrian.innerHTML += (`
                           <tr> 
                        <th> ${data.val().noAntrian}</th>
                        <th id ="callBtn${condition}" onclick="panggilAntrian('${data.val().noAntrian}', '${data.key}','${hitungNilaiSoundState}')"> 
                            <button class="btn btn-success btn-sm rounded-circle"><i class="bi-mic-fill"></i></button>                 
                        </th>
                        <th>
                            <button class="btn btn-danger btn-sm rounded-circle" onclick="selesaiAntrian('${data.key}','${data.val().noAntrian}')">Selesai</button>
                        </th>
                        </tr>
                    `)
                    condition += 1
                    if(condition == 1){
                        antrianSelanjutnya.innerHTML = data.val().noAntrian
                    }
                    sisaAntrian.innerHTML = parseInt(sisaAntrian.innerHTML) + 1
                    break
                }
                case 1 : {
                    listAntrian.innerHTML += (`
                        <tr>
                        <th> ${data.val().noAntrian}</th>  
                        <th id ="callBtn${condition}" onclick="panggilAntrian( '${data.val().noAntrian}', '${data.key}','${hitungNilaiSoundState}')"> 
                            <button class="btn btn-secondary btn-sm rounded-circle"><i class="bi-mic-fill"></i></button>                      
                        </th>
                        <th>
                            <button class="btn btn-danger btn-sm rounded-circle" onclick="selesaiAntrian('${data.key}','${data.val().noAntrian}')">Selesai</button>
                        </th>
                        </tr>`)
                    break
                }
                case 2 : {
                    listAntrianSelesai.innerHTML += (`
                        <tr>
                        <th> ${data.val().noAntrian}</th>  
                        <th id ="callBtn${condition}" onclick="panggilAntrian( '${data.val().noAntrian}', '${data.key}','${hitungNilaiSoundState}')"> 
                            <button class="btn btn-success btn-sm rounded-circle"><i class="bi-mic-fill"></i></button>                      
                        </th>
                        <th style="color:#00FF00;">Selesai!</th>
                        </tr>`)
                    // hitungNilai2++;
                    break
                }
            }
        })

        if (hitungNilai2 == 0) {
            listAntrianSelesai.innerHTML = (`
                <tr>
                    <th colspan="3" style="text-align:center">Belum ada antrian selesai</th>
                </tr>
            `)
        }
    })
}


function selesaiAntrian(key, noAntrian){
    firebase.database().ref("antrian/layananTitipanBrg").child(key).set({
        timestamp: Date.now(),
        noAntrian: noAntrian,
        status: 2,
        soundState: 0,
        loket : 0
    })
}

function setAntrianSekarang(){
    firebase.database().ref("antrian/layananTitipanBrg").orderByChild("timestamp").on("value", (snap) => {
        let adaAntrianSekarang = false;
        snap.forEach((data) => {
            if(data.val().status == 1){
                antrianSekarang.innerHTML = data.val().noAntrian
                adaAntrianSekarang = true;
            }
        })
        if (!adaAntrianSekarang) {
            antrianSekarang.innerHTML = "-";
        }
    })
}

function resetData(){
    firebase.database().ref("antrian/layananTitipanBrg").remove()
}

function panggilAntrian(noAntrian, antrianKey, hitungNilaiSoundState){
    // if(hitungNilaiSoundState < 1 ){ 
        firebase.database().ref("antrian/layananTitipanBrg").child(antrianKey).set({
            timestamp: Date.now(),
            noAntrian: noAntrian,
            status: 1,
            soundState: 1,
            loket : loketValue
        })
    // }
    // console.log(hitungNilaiSoundState)
}

// Ketika tombol reset diklik
resetBtn.addEventListener('click', () => {
    $('#confirmResetModal').modal('show');
});
  
// Ketika tombol konfirmasi reset ditekan
document.getElementById('confirmResetBtn').addEventListener('click', function() {
    resetData();
    $('#confirmResetModal').modal('hide');
    window.location.reload();
});

// Ketika tombol konfirmasi reset ditekan
document.getElementById('confirmResetBtn').addEventListener('click', function() {
    resetData();
    $('#confirmResetModal').modal('hide');
    window.location.reload();
});

document.getElementById("tombol-input-antrian").addEventListener("click", function() {
    const inputAntrian = document.getElementById("input-antrian");
    const nomorAntrian = inputAntrian.value.trim();
    if (nomorAntrian === "") {
        $('#inputErrorModal').modal('show');
        return;
    }
    $('#confirmInputModal').modal('show');
});

document.getElementById('confirmInputBtn').addEventListener('click', function() {
    $('#confirmInputModal').modal('hide');
    insertData();
    // window.location.reload();
});

document.getElementById("input-antrian").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Mencegah aksi default form submit
        document.getElementById("tombol-input-antrian").click();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    getData();
    setAntrianSekarang();

});

