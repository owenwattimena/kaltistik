
export const Berkelompok = {
    template: `
        <div class="col-md-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#dataBerkelompok" aria-expanded="false"
                                aria-controls="dataBerkelompok">
                                Data Berkelompok
                            </button>
                        </h5>
                    </div>

                    <!-- data berkelompok -->
                    <div id="dataBerkelompok" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <table class="table tabel-berkelompok table-bordered text-center">
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
                                    <p class="border border-primary p-2">
                                        Mod = L<sub>0</sub> + C ((f<sub>1</sub>)<sub>0</sub>) /
                                        (f<sub>1</sub>)<sub>0</sub> + (f<sub>2</sub>)<sub>0</sub>)
                                    </p>
                                    <p>
                                        L<sub>0</sub> = <span class="batas_bawah">BB</span> - 0.5 = <span
                                            class="L_nol">L0</span>
                                    </p>
                                    <p>
                                        C = <span class="tepi_atas_kelas">TAK</span> - <span
                                            class="tepi_bawah_kelas">TBK</span> =
                                        <span class="C">C</span>
                                    </p>
                                    <p>
                                        (f<sub>1</sub>)<sub>0</sub> = <span class="f_mod">fm</span> - <span
                                            class="fi_bawah_mod">0</span> = <span
                                            class="f_satu_nol">F10</span>
                                    </p>
                                    <p>
                                        (f<sub>2</sub>)<sub>0</sub> = <span class="f_mod">fm</span> - <span
                                            class="fi_atas_mod">0</span> = <span
                                            class="f_dua_nol">F20</span>
                                    </p>

                                    <p>
                                        Mod = <span class="L_nol">l0</span> + <span class="C">C</span>
                                        (<span class="f_satu_nol">f10</span> /
                                        (<span class="f_satu_nol">f10</span> + <span
                                            class="f_dua_nol">f20</span>)
                                    </p>
                                    <p>
                                        <span class="L_nol">l0</span> + <span class="C">C</span> (<span
                                            class="f_satu_nol">f10</span> /
                                        <span class="f_satu_dua_nol">f120</span>)
                                    </p>
                                    <p>
                                        <span class="L_nol">l0</span> + <span class="C">C</span>
                                        (<span class="f_satu_nol_per_f_satu_dua_nol">f1/f120</span>)
                                    </p>
                                    <p>
                                        <span class="L_nol">l0</span> + <span
                                            class="C_f_satu_nol_per_f_satu_dua_nol">Cf1/f120</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        Modus = <span class="MOD">Mod</span>
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
        // tambah baris
        $('.btn-add-row').click(function () {
            tambah_baris($('.tabel-berkelompok'));
        });

        // hapus baris
        $('tr .x-row').on('click', function () {
            let tr = $(this);
            hapus_baris(tr);
        });



        // aksi data berkelompok

        $('.btn-berkelompok').click(function () {
            $('.jawaban-berkelompok').removeClass('d-none');

            $('.tr').removeClass('alert-success');
            // cek kelayakan data dan ambil data frekuensi
            let $f = new Array();
            let $n = 0; // Nilai n
            let $bool_baris = false;
            let $bool_angka = true;


            $('.tabel-berkelompok').find('tbody .tr').each(function (i, e) {
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




            let $f_modus = Math.max.apply(Math, $f);
            let $index_f_modus = $f.indexOf($f_modus);
            let $frekuensi_i_bawah_mod = 0, $frekuensi_i_atas_mod = 0, $batas_bawah_mod = 0, $batas_atas_mod = 0;

            $('.tabel-berkelompok').find('tbody .tr').each(function (i) {
                let $td = $(this).find('td');
                if ($index_f_modus - 1 == i) {
                    $frekuensi_i_bawah_mod = parseFloat($td.eq(2).text());
                }
                if ($index_f_modus == i) {
                    $batas_bawah_mod = parseFloat($td.eq(0).text());
                    $batas_atas_mod = parseFloat($td.eq(1).text());
                    $(this).addClass('alert-success');
                }
                if ($index_f_modus + 1 == i) {
                    $frekuensi_i_atas_mod = parseFloat($td.eq(2).text());
                }
            });


            let $L_nol = $batas_bawah_mod - 0.5;
            let $tepi_bawah_kelas = $L_nol;
            let $tepi_atas_kelas = $batas_atas_mod + 0.5;
            let $C = $tepi_atas_kelas - $tepi_bawah_kelas; //nilai C
            let $f_satu_nol = $f_modus - $frekuensi_i_bawah_mod;
            let $f_dua_nol = $f_modus - $frekuensi_i_atas_mod;
            let $f_satu_dua_nol = $f_satu_nol + $f_dua_nol;
            let $f_satu_nol_per_f_satu_dua_nol = $f_satu_nol / $f_satu_dua_nol;
            let $C_f_satu_nol_per_f_satu_dua_nol = $C * $f_satu_nol_per_f_satu_dua_nol;
            let $MOD = $L_nol + $C_f_satu_nol_per_f_satu_dua_nol; //nilai dari L0 - ((C * (f10 / (f1o+f20)

            $('.batas_bawah').text($batas_bawah_mod);
            $('.L_nol').text($L_nol);
            $('.tepi_atas_kelas').text($tepi_atas_kelas);
            $('.tepi_bawah_kelas').text($tepi_bawah_kelas);
            $('.C').text($C);
            $('.f_mod').text($f_modus);
            $('.fi_bawah_mod').text($frekuensi_i_bawah_mod);
            $('.fi_atas_mod').text($frekuensi_i_atas_mod);
            $('.f_satu_nol').text($f_satu_nol);
            $('.f_dua_nol').text($f_dua_nol);
            $('.f_satu_dua_nol').text($f_satu_dua_nol);
            $('.f_satu_nol_per_f_satu_dua_nol').text($f_satu_nol_per_f_satu_dua_nol);
            $('.C_f_satu_nol_per_f_satu_dua_nol').text($C_f_satu_nol_per_f_satu_dua_nol);
            $('.MOD').text($MOD);

            $('.jawaban-benar-berkelompok').removeClass('d-none');
            $('.alert-berkelompok').addClass('d-none');

        });
    }
}