/* ======================================
   STATUS.JS
====================================== */

document.addEventListener("DOMContentLoaded", tampilStatus);

function tampilStatus(){

    let daftarPAS = JSON.parse(localStorage.getItem("daftarPAS")) || [];

    let tbody = document.getElementById("statusBody");

    if(!tbody) return;

    tbody.innerHTML="";

    if(daftarPAS.length==0){

        tbody.innerHTML=`
        <tr>
        <td colspan="7">
        Belum ada data pengajuan.
        </td>
        </tr>
        `;

        return;

    }

    daftarPAS.forEach(function(data,index){

        tbody.innerHTML += `

        <tr>

        <td>${index+1}</td>

        <td>${data.registrasi}</td>

        <td>${data.nama}</td>

        <td>${data.instansi}</td>

        <td>${data.jenisPas}</td>

        <td>${data.status}</td>

        </tr>

        `;

    }); 

}
