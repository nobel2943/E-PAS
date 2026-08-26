```javascript
/* ======================================
   STATUS.JS - E-PAS
   Menampilkan:
   1. Pengajuan PAS Baru dari Supabase
   2. Perpanjangan PAS dari localStorage
====================================== */


// ======================================
// KONFIGURASI SUPABASE
// ======================================

const SUPABASE_URL = "https://cucyzdqexcspjlymryi.supabase.co";

const SUPABASE_KEY = "sb_publishable_e5b12jPjqKsA8NN_rvb_kg_8NHA1okq";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ======================================
// JALANKAN SAAT HALAMAN DIBUKA
// ======================================

document.addEventListener("DOMContentLoaded", tampilStatus);


// ======================================
// TAMPILKAN STATUS
// ======================================

async function tampilStatus() {

    const tbody = document.getElementById("statusBody");
    const infoStatus = document.getElementById("infoStatus");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (infoStatus) {
        infoStatus.innerText = "Memuat data pengajuan...";
    }


    try {

        // ======================================
        // AMBIL DATA PENGAJUAN BARU DARI SUPABASE
        // ======================================

        const { data: pengajuanBaru, error } =
            await supabaseClient
                .from("pengajuan_pas")
                .select("*")
                .order("created_at", {
                    ascending: false
                });


        if (error) {
            throw error;
        }


        // ======================================
        // AMBIL DATA PERPANJANGAN DARI LOCALSTORAGE
        // ======================================

        const daftarPAS =
            JSON.parse(
                localStorage.getItem("daftarPAS")
            ) || [];


        // ======================================
        // JIKA TIDAK ADA DATA SAMA SEKALI
        // ======================================

        if (
            pengajuanBaru.length === 0 &&
            daftarPAS.length === 0
        ) {

            tbody.innerHTML = `
                <tr>
                    <td colspan="6">
                        Belum ada data pengajuan.
                    </td>
                </tr>
            `;

            if (infoStatus) {
                infoStatus.innerText = "";
            }

            return;
        }


        let nomor = 1;


        // ======================================
        // TAMPILKAN PENGAJUAN BARU
        // ======================================

        pengajuanBaru.forEach(function (data) {

            tbody.innerHTML += `

                <tr>

                    <td>${nomor}</td>

                    <td>
                        ${data.nomor_pengajuan || "-"}
                    </td>

                    <td>
                        ${data.nama_pemohon || "-"}
                    </td>

                    <td>
                        ${data.instansi || "-"}
                    </td>

                    <td>
                        ${data.jenis_pengajuan || "-"}
                    </td>

                    <td>
                        <span class="status-menunggu">
                            ${data.status || "Menunggu"}
                        </span>
                    </td>

                </tr>

            `;

            nomor++;

        });


        // ======================================
        // TAMPILKAN DATA PERPANJANGAN
        // ======================================

        daftarPAS.forEach(function (data) {

            tbody.innerHTML += `

                <tr>

                    <td>${nomor}</td>

                    <td>
                        ${data.registrasi || "-"}
                    </td>

                    <td>
                        ${data.nama || "-"}
                    </td>

                    <td>
                        ${data.instansi || "-"}
                    </td>

                    <td>
                        ${data.jenisPas || "Perpanjangan PAS"}
                    </td>

                    <td>
                        <span class="status-menunggu">
                            ${data.status || "Menunggu"}
                        </span>
                    </td>

                </tr>

            `;

            nomor++;

        });


        if (infoStatus) {
            infoStatus.innerText =
                "Data pengajuan dan perpanjangan PAS berhasil dimuat.";
        }


    } catch (error) {

        console.error("Gagal mengambil status:", error);

        tbody.innerHTML = `

            <tr>
                <td colspan="6">
                    Gagal memuat data pengajuan.
                    <br>
                    ${error.message}
                </td>
            </tr>

        `;

        if (infoStatus) {
            infoStatus.innerText = "";
        }

    }

}
```
                       
