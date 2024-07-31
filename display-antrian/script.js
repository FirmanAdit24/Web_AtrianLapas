function loadAntrian() {
    var antrianDisabilitas = 0;
    var antrianKunjungan = 0;
    var antrianTitipan = 0;
    var antrianYankomas = 0;
    $('#antrian-disabilitas').text(antrianDisabilitas);
    $('#antrian-kunjungan').text(antrianKunjungan);
    $('#antrian-titipan').text(antrianTitipan);
    $('#antrian-yankomas').text(antrianYankomas);
  }
  
  function updateClock() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var seconds = now.getSeconds().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes + ':' + seconds;
    $('#clock').text(timeString);
  }
  
  function updateDate() {
    var now = new Date();
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var dayName = days[now.getDay()];
    var date = now.getDate().toString().padStart(2, '0');
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var year = now.getFullYear();
    var dateString = dayName + ', ' + date + ' ' + getMonthName(month) + ' ' + year;
    $('#hari').text(dayName);
    $('#tanggal').text(dateString);
  }
  
  function getMonthName(month) {
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return months[parseInt(month) - 1];
  }
  
  $(document).ready(function() {
    // loadAntrian();
    updateClock();
    updateDate();
    // setInterval(loadAntrian, 5000); // Refresh antrian setiap 5 detik
    setInterval(updateClock, 1000); // Refresh jam setiap detik
    setInterval(updateDate, 3600000); // Refresh tanggal setiap jam
  });
  