// function rerata hitung
function rata_rata_hitung(input, alert, sig, N_n, hasil, kotak_jawaban, jawaban, simbol) {
    $(kotak_jawaban).removeClass('d-none');
    let data_parameter = $(input).val();
    data_parameter = data_parameter.trim();
    let data = data_parameter.split(',');
    for (let i = 0; i < data.length; i++) {
        if (data[i] != "") {
            if (!data[i].match($number)) {
                $(jawaban).addClass('d-none');
                $(alert).removeClass('d-none');
                $(alert).text('Data harus berupa angka!');
                return;
            }
        } else {
            $(jawaban).addClass('d-none');
            $(alert).removeClass('d-none');
            $(alert).text('Mohon masukan data dengan benar');
            return;
        }
    }
    $(alert).addClass('d-none');
    $(jawaban).removeClass('d-none');
    let banyak_data = data.length;
    let total = 0;

    for (let i = 0; i < data.length; i++) {
        total = total + (parseFloat(data[i]));
    }

    let hasil_jawaban = total / banyak_data;
    $(sig).text(total);
    $(N_n).text(banyak_data);
    $(hasil).html('Jawaban : ' + simbol + " = " + (hasil_jawaban));
}


// function tambah baris
function tambah_baris(tabel) {
    var duplikat = tabel.find('tr.d-none').clone(true);
    duplikat.removeClass('d-none');
    duplikat.addClass('tr');
    tabel.append(duplikat);
}

// function hapus baris
function hapus_baris(tr) {
    tr.parents('tr').detach();
}