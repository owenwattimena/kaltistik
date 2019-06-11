let $number = /^[0-9.]+$/;

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
    let total = sigma_x(data);

    // for (let i = 0; i < data.length; i++) {
    //     total = total + (parseFloat(data[i]));
    // }

    let hasil_jawaban = rata_rata(data);

    $(sig).text(total);
    $(N_n).text(banyak_data);
    $(hasil).html('Jawaban : ' + simbol + " = " + (hasil_jawaban));
}

function n($data) {

}

function sigma_x($data) {
    let $total = 0;
    for (let i = 0; i < $data.length; i++) {
        $total = $total + (parseFloat($data[i]));
    }
    return $total;
}

function rata_rata($data) {
    let $total = sigma_x($data);
    let $banyak_data = $data.length;
    return $total / $banyak_data;
}

function median($data) {
    let $panjang_data = $data.length;
    if ($panjang_data % 2 == 0) {
        // genap
        let $K = ($panjang_data / 2) - 1;
        return (parseFloat($data[$K]) + parseFloat($data[$K + 1])) / 2;

    }
    else {
        // ganjil
        let $K = ($data.length - 1) / 2;
        let $med = $K + 1;
        let $MED = $med - 1;
        return $data[$MED];
    }
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

// function cek data
function is_data($data) {
    if ($data == "") {
        return false;
    }
    return true;
}

// pecahkan string
function explode($string, $delimiter) {
    return $string.split($delimiter);
}
//periksa kelayakan data
function data_valid($data) {
    let $result;
    for (let i = 0; i < $data.length; i++) {
        if ($data[i] != "") {
            if (!$data[i].match($number)) {
                $result = {
                    "error": true,
                    "mesage": "Data harus berupa angka dan tidak boleh mengandung spasi!"
                };
                return $result;
            }
        } else {
            $result = {
                "error": true,
                "mesage": "Mohon masukan data dengan benar"
            };
            return $result;
        }

    }
    $result = {
        "error": false
    };
    return $result;
}
// urutkan data secara ascending
// function sort_data_ascending