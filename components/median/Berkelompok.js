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

                    <div id="dataBerkelompok" class="collapse" aria-labelledby="headingOne"
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
                                    <p class="border border-primary p-2">
                                        Median = L<sub>0</sub> + C ((n/2 - (&Sigma;fi)<sub>0</sub>) / fm)
                                    </p>
                                    <p>
                                        n = <span class="n">40</span>;
                                    </p>
                                    <p>
                                        n/2 = <span class="n">40</span>/2 = <span class="K">K</span>
                                    </p>
                                    <p>
                                        L<sub>0</sub> = <span class="batas_bawah">BB</span> - 0.5 = <span
                                            class="L_nol">L0</span>
                                    </p>
                                    <p>
                                        (&Sigma;fi)<sub>0</sub> = <span class="sigmaFi_nol">0</span>
                                    </p>
                                    <p>
                                        C = <span class="tepi_atas_kelas">TAK</span> - <span
                                            class="tepi_bawah_kelas">TBK</span> =
                                        <span class="C">C</span>
                                    </p>
                                    <p>
                                        fm = <span class="fm">fm</span>
                                    </p>

                                    <p>
                                        Median = <span class="L_nol">L0</span> + <span class="C">C</span>
                                        ((<span class="n">n</span>/2) - <span
                                            class="sigmaFi_nol">SigFi_0</span> ) / <span
                                            class="fm">Fm</span>)
                                    </p>
                                    <p>
                                        <span class="L_nol">L0</span> + <span class="C">C</span> ((<span
                                            class="K">K</span> - <span class="sigmaFi_nol">0</span>)/ <span
                                            class="fm">fm</span> )
                                    </p>
                                    <p>
                                        <span class="L_nol">L0</span> + <span class="C">C</span> (<span
                                            class="KsigmaFi_nol">KsigmaFi0</span>/ <span
                                            class="fm">fm</span> )
                                    </p>
                                    <p>
                                        <span class="L_nol">L0</span> + (<span
                                            class="CKsigmaFi_nol">CKsigmaFi0</span>/ <span
                                            class="fm">fm</span> )
                                    </p>
                                    <p>
                                        <span class="L_nol">L0</span> + <span
                                            class="CKsigmaFi_nolFm">CKsigmaFi0</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        Median = <span class="MED">Med</span>
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
            tambah_baris($('.table'));
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

            $('.table').find('tbody .tr').each(function (i, e) {
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


            let $K = $n / 2; //nilai K
            let $indexFm = 0; //nilai index row dari kelas yang ada mediannya 
            let $sig_fi_nol = $f[0];
            for (let i = 0; i < $f.length; i++) {
                if ($sig_fi_nol >= $K) {
                    $indexFm = i;
                    $sig_fi_nol = $sig_fi_nol - $f[i];
                    break;
                }
                else {
                    $sig_fi_nol = $sig_fi_nol + $f[i + 1];
                }
            }


            let $batas_bawah;
            let $batas_atas
            // let $tepi_bawah_kelas = 0;
            // let $tepi_atas_kelas = 0;
            let $fm = 0; //Frekuensi yang ada mediannnya
            $('.table').find('tbody .tr').each(function (i, e) {
                if (i == $indexFm) {
                    let $td = $(this).find('td');
                    $batas_bawah = $td.eq(0).text();
                    $batas_atas = $td.eq(1).text();
                    let $frekuensi_i = $td.eq(2).text();

                    $batas_bawah = parseFloat($batas_bawah.trim());
                    $batas_atas = parseFloat($batas_atas.trim());
                    $frekuensi_i = parseFloat($frekuensi_i.trim());
                    $fm = $frekuensi_i;
                    $(this).addClass('alert-success');
                }
            });

            let $L_nol = $batas_bawah - 0.5;
            let $tepi_bawah_kelas = $L_nol;
            let $tepi_atas_kelas = $batas_atas + 0.5;
            let $C = $tepi_atas_kelas - $tepi_bawah_kelas; //nilai C
            let $KsigmaFi_nol = $K - $sig_fi_nol; // nilai dari K - (Sigma fi)0
            let $CKsigmaFi_nol = $C * $KsigmaFi_nol; // nilai dari C * (K - (Sigma fi)0)
            let $CKsigmaFi_nolFm = $CKsigmaFi_nol / $fm; // nilai dari (C * (K - (Sigma fi)0)) / fm
            let $MED = $L_nol + $CKsigmaFi_nolFm; //nilai dari L0 - ((C * (K - (Sigma fi)0)) / fm)

            $('.n').text($n);
            $('.K').text($K);
            $('.batas_bawah').text($batas_bawah);
            $('.L_nol').text($L_nol);
            $('.sigmaFi_nol').text($sig_fi_nol);
            $('.tepi_atas_kelas').text($tepi_atas_kelas);
            $('.tepi_bawah_kelas').text($tepi_bawah_kelas);
            $('.C').text($C);
            $('.fm').text($fm);
            $('.KsigmaFi_nol').text($KsigmaFi_nol);
            $('.CKsigmaFi_nol').text($CKsigmaFi_nol);
            $('.CKsigmaFi_nolFm').text($CKsigmaFi_nolFm);
            $('.MED').text($MED);

            $('.jawaban-benar-berkelompok').removeClass('d-none');
            $('.alert-berkelompok').addClass('d-none');

        });
    }
}