
export const Berkelompok = {
    template: `
        <div class="col-sm-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#berkelompok" aria-expanded="true" aria-controls="berkelompok">
                                Data Berkelompok
                            </button>
                        </h5>
                    </div>
                    <div id="berkelompok" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th scope="col" colspan="2">X</th>
                                        <th scope="col" rowspan="2" class="align-middle">f</th>
                                        <th scope="col" rowspan="2" class="align-middle">
                                            <button class="btn btn-success btn-sm btn-add-row">
                                                <i class="fa fa-plus"></i>
                                            </button>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>BB</th>
                                        <th>BA</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="tr">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row"></i>
                                        </td>
                                    </tr>

                                    <tr class="d-none">
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td contenteditable="true"></td>
                                        <td>
                                            <i class="fa fa-times-circle x-row"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <button class="btn btn-primary btn-berkelompok">Hasil</button>
                            <div class="jawaban-berkelompok d-none">
                                <hr>
                                <div class="alert alert-berkelompok alert-danger d-none" role="alert"></div>
                                <div class="jawaban-benar-berkelompok text-center d-none">
                                    <span>Cara a :</span>
                                    <p class="border border-primary p-2">
                                        NJ = NTT - NTP
                                    </p>
                                    <p>
                                        NTT = (<span class="batas-bawah-terakhir">BBT</span> + <span
                                            class="batas-atas-terakhir">BAT</span>) / 2 = <span
                                            class="NTT">NTT</span>
                                    </p>
                                    <p>
                                        NTP = (<span class="batas-bawah-awal">BBA</span> + <span
                                            class="batas-atas-awal">BAA</span>) / 2 = <span
                                            class="NTP">NTP</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        NJ = <span class="NTT">NTT</span> - <span class="NTP">NTP</span> =
                                        <span class="NJ_a">NJ a</span>
                                    </p>
                                    <span>Cara b :</span>
                                    <p class="border border-primary p-2">
                                        NJ = BAT - BBP
                                    </p>
                                    <p>
                                        BAT = <span class="batas-atas-terakhir">BAT</span> + 0.5 = <span
                                            class="BAT">BAT</span>
                                    </p>
                                    <p>
                                        BBP = <span class="batas-bawah-awal">BBA</span> - 0.5 = <span
                                            class="BBP">BBP</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        NJ = <span class="BAT">BAT</span> - <span class="BBP">BBP</span> =
                                        <span class="NJ_b">NJ a</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // Data berkelompok

        // tambah baris
        $('.btn-add-row').click(function () {
            tambah_baris($('#berkelompok .table'));
        });
        // hapus tabel
        $('tr .x-row').on('click', function () {
            let tr = $(this);
            hapus_baris(tr);
        });

        $('.btn-berkelompok').click(function () {

            $('.jawaban-berkelompok').removeClass('d-none');

            let $f = new Array();
            let $n = 0; // Nilai n
            let $bool_baris = false;
            let $bool_angka = true;

            $('#berkelompok .table').find('tbody .tr').each(function (i, e) {
                $bool_baris = true;
                let $td = $(this).find('td');
                let $batas_bawah = $td.eq(0).text();
                let $batas_atas = $td.eq(1).text();
                let $frekuensi_i = $td.eq(2).text();

                $batas_bawah = $batas_bawah.trim();
                $batas_atas = $batas_atas.trim();
                $frekuensi_i = $frekuensi_i.trim();

                if ($batas_bawah == "" || $batas_atas == "" || $frekuensi_i == "") {
                    $bool_angka = false;
                    return;
                }

                if (!$batas_bawah.match($number) || !$batas_atas.match($number) || !$frekuensi_i.match($number)) {
                    $bool_angka = false;
                    return;
                }

                $frekuensi_i = parseFloat($frekuensi_i);

                $f[i] = $frekuensi_i;
                $n = $n + $frekuensi_i;
            });

            if (!$bool_baris) {
                $('.jawaban-benar-berkelompok').addClass('d-none');
                $('.alert-berkelompok').removeClass('d-none');
                $('.alert-berkelompok').text('Silahkan tambah data');
                return;
            }
            if (!$bool_angka) {
                $('.jawaban-benar-berkelompok').addClass('d-none');
                $('.alert-berkelompok').removeClass('d-none');
                $('.alert-berkelompok').text('Mohon masukan data dengan benar! Data tidak boleh kosong dan harus berupa angka!!!');
                return;
            }
            if ($f.length <= 1) {
                $('.jawaban-benar-berkelompok').addClass('d-none');
                $('.alert-berkelompok').removeClass('d-none');
                $('.alert-berkelompok').text('Mohon masukan lebih dari 1 data!!!');
                return;
            }

            let $BBT = 0, $BAP = 0, $BAT = 0, $BBP = 0;
            $('#berkelompok .table').find('tbody .tr').each(function (i, e) {
                if (i == 0) {
                    let $td = $(this).find('td');
                    let $batas_bawah = $td.eq(0).text();
                    let $batas_atas = $td.eq(1).text();
                    $BBP = parseFloat($batas_bawah);
                    $BAP = parseFloat($batas_atas);
                }

                if (i == $f.length - 1) {
                    let $td = $(this).find('td');
                    let $batas_bawah = $td.eq(0).text();
                    let $batas_atas = $td.eq(1).text();
                    $BBT = parseFloat($batas_bawah);
                    $BAT = parseFloat($batas_atas);
                }
            });

            // cara a
            let $NTT = ($BBT + $BAT) / 2;
            let $NTP = ($BBP + $BAP) / 2;
            let $NJ_a = $NTT - $NTP;

            // cara b
            let $TAT = $BAT + 0.5;
            let $TBP = $BBP - 0.5;
            let $NJ_b = $TAT - $TBP;

            // print out
            $('.batas-bawah-terakhir').text($BBT);
            $('.batas-atas-terakhir').text($BAT);
            $('.NTT').text($NTT);
            $('.batas-bawah-awal').text($BBP);
            $('.batas-atas-awal').text($BAP);
            $('.NTP').text($NTP);
            $('.NJ_a').text($NJ_a);

            $('.BAT').text($TAT);
            $('.BBP').text($TBP);
            $('.NJ_b').text($NJ_b);


            $('.jawaban-benar-berkelompok').removeClass('d-none');
            $('.alert-berkelompok').addClass('d-none');

        });
    }
}