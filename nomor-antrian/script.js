const antrianA = document.getElementById("antrianA");
const insertA = document.getElementById("insertA");
const hurufAntrianA = document.getElementById("hurufAntrianA");
const refresh = document.getElementById("btnRefresh");
const hurufAntrianB = document.getElementById("hurufAntrianB");
const hurufAntrianC = document.getElementById("hurufAntrianC");
const hurufAntrianD = document.getElementById("hurufAntrianD");
const btnPrint = document.getElementById("btnPrint");
const resetBtn = document.getElementById("btnReset");
const antrianB = document.getElementById("antrianB");
const insertB  = document.getElementById("insertB");
const antrianC = document.getElementById("antrianC");
const insertC = document.getElementById("insertC");
const antrianD = document.getElementById("antrianD");
const insertD = document.getElementById("insertD");

function showOfflineNotification() {
    alert("Internet tidak tersedia");
}

function checkInternetConnection() {
    return navigator.onLine;
}

function handleButtonClick(callback) {
    if (checkInternetConnection()) {
        callback();
    } else {
        showOfflineNotification();
    }
}

// Tambahkan event listener untuk tombol
insertA.addEventListener("click", () => {
    handleButtonClick(() => {
        if (antrianA.innerHTML !== "-") {
            document.getElementById("printLayanan").innerHTML = "Layanan Disabilitas";
            document.getElementById("printNoAntrian").innerHTML = hurufAntrianA.innerHTML + antrianA.innerHTML;

            let now = new Date();
            let options = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            };
            let formattedDate = now.toLocaleDateString('id-ID', options);
            document.getElementById("currentTime").innerHTML = formattedDate;

            window.print();

            firebase.database().ref("antrian/layananDisabilitas").child(antrianA.innerHTML).set({
                'timestamp': now.getTime(),
                'noAntrian': hurufAntrianA.innerHTML + antrianA.innerHTML,
                'status': 0,
                'soundState': 0,
                'loket': 0,
            });
        }
    });
});

insertB.addEventListener("click", () => {
    handleButtonClick(() => {
        if (antrianB.innerHTML !== "-") {
            document.getElementById("printLayanan").innerHTML = "Layanan Kunjungan";
            document.getElementById("printNoAntrian").innerHTML = hurufAntrianB.innerHTML + antrianB.innerHTML;

            let now = new Date();
            let options = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            };
            let formattedDate = now.toLocaleDateString('id-ID', options);
            document.getElementById("currentTime").innerHTML = formattedDate;

            window.print();

            firebase.database().ref("antrian/layananKunjungan").child(antrianB.innerHTML).set({
                'timestamp': now.getTime(),
                'noAntrian': hurufAntrianB.innerHTML + antrianB.innerHTML,
                'status': 0,
                'soundState': 0,
                'loket': 0,
            });
        }
    });
});

insertC.addEventListener("click", () => {
    handleButtonClick(() => {
        if (antrianC.innerHTML !== "-") {
            document.getElementById("printLayanan").innerHTML = "Layanan Titipan Barang";
            document.getElementById("printNoAntrian").innerHTML = hurufAntrianC.innerHTML + antrianC.innerHTML;

            let now = new Date();
            let options = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            };
            let formattedDate = now.toLocaleDateString('id-ID', options);
            document.getElementById("currentTime").innerHTML = formattedDate;

            window.print();

            firebase.database().ref("antrian/layananTitipanBrg").child(antrianC.innerHTML).set({
                'timestamp': now.getTime(),
                'noAntrian': hurufAntrianC.innerHTML + antrianC.innerHTML,
                'status': 0,
                'soundState': 0,
                'loket': 0,
            });
        }
    });
});

insertD.addEventListener("click", () => {
    handleButtonClick(() => {
        if (antrianD.innerHTML !== "-") {
            document.getElementById("printLayanan").innerHTML = "Yankomas";
            document.getElementById("printNoAntrian").innerHTML = hurufAntrianD.innerHTML + antrianD.innerHTML;

            let now = new Date();
            let options = { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', 
                hour: '2-digit', minute: '2-digit' 
            };
            let formattedDate = now.toLocaleDateString('id-ID', options);
            document.getElementById("currentTime").innerHTML = formattedDate;

            window.print();

            firebase.database().ref("antrian/yankomas").child(antrianD.innerHTML).set({
                'timestamp': now.getTime(),
                'noAntrian': hurufAntrianD.innerHTML + antrianD.innerHTML,
                'status': 0,
                'soundState': 0,
                'loket': 0,
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (checkInternetConnection()) {
        getData();
    } else {
        showOfflineNotification();
    }
});

function getData() {
    // Fungsi untuk mengambil data dari Firebase dan memperbarui tampilan
    firebase.database().ref("antrian/layananDisabilitas").orderByChild("timestamp").on("value", (snap) => {
        if (snap.exists()) {
            snap.forEach((data) => {
                antrianA.innerHTML = parseInt(data.key) + 1;
                if (antrianA.innerHTML.length == 2) {
                    hurufAntrianA.innerHTML = "A0";
                }
                if (antrianA.innerHTML.length == 3) {
                    hurufAntrianA.innerHTML = "A";
                }
                if (antrianA.innerHTML.length == 1) {
                    hurufAntrianA.innerHTML = "A00";
                }
            });
        } else {
            console.log("kosong");
            hurufAntrianA.innerHTML = "A";
            antrianA.innerHTML = "001";
        }
    });

    firebase.database().ref("antrian/layananKunjungan").on("value", (snap) => {
        if (snap.exists()) {
            snap.forEach((data) => {
                antrianB.innerHTML = parseInt(data.key) + 1;
                if (antrianB.innerHTML.length == 2) {
                    hurufAntrianB.innerHTML = "B0";
                }
                if (antrianB.innerHTML.length == 3) {
                    hurufAntrianB.innerHTML = "B";
                }
                if (antrianB.innerHTML.length == 1) {
                    hurufAntrianB.innerHTML = "B00";
                }
            });
        } else {
            console.log("Kosong");
            hurufAntrianB.innerHTML = "B";
            antrianB.innerHTML = "001";
        }
    });

    firebase.database().ref("antrian/layananTitipanBrg").on("value", (snap) => {
        if (snap.exists()) {
            snap.forEach((data) => {
                antrianC.innerHTML = parseInt(data.key) + 1;
                if (antrianC.innerHTML.length == 2) {
                    hurufAntrianC.innerHTML = "C0";
                }
                if (antrianC.innerHTML.length == 3) {
                    hurufAntrianC.innerHTML = "C";
                }
                if (antrianC.innerHTML.length == 1) {
                    hurufAntrianC.innerHTML = "C00";
                }
            });
        } else {
            console.log("Kosong");
            hurufAntrianC.innerHTML = "C";
            antrianC.innerHTML = "001";
        }
    });

    firebase.database().ref("antrian/yankomas").on("value", (snap) => {
        if (snap.exists()) {
            snap.forEach((data) => {
                antrianD.innerHTML = parseInt(data.key) + 1;
                if (antrianD.innerHTML.length == 2) {
                    hurufAntrianD.innerHTML = "D0";
                }
                if (antrianD.innerHTML.length == 3) {
                    hurufAntrianD.innerHTML = "D";
                }
                if (antrianD.innerHTML.length == 1) {
                    hurufAntrianD.innerHTML = "D00";
                }
            });
        } else {
            console.log('Kosong');
            hurufAntrianD.innerHTML = "D";
            antrianD.innerHTML = "001";
        }
    });
}
