export const PenyajianTabelDistribusi = {
    template: `
        <div class="col-12">
            <form>
            <div class="form-group">

                <label for="exampleFormControlTextarea1">Masukan Data</label>
                <textarea class="form-control input-data" id="exampleFormControlTextarea1" rows="5"
                    placeholder="Contoh: 1,2,3,4,5.6 (tanpa spasi)"></textarea>
            </div>

            </form>
            <button class="btn btn-primary btn-parameter btn-hasil">Hasil</button>
            <div class="jawaban d-none">
                <hr>
                <div class="alert alert-danger d-none" role="alert"></div>
                <div class="jawaban-benar-distribusi-frekuensi text-center d-none">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="card card-data">
                                <div class="card-header">
                                    Data
                                </div>
                                <div class="card-body text-left data-distribusi-f">
                                    <span class="data"></span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Rentang
                                </div>
                                <div class="card-body">
                                    <p class="border border-primary p-2">
                                        R = Xmax - Xmin
                                    </p>
                                    <p>
                                        <span class="x-max">0</span> - <span class="x-min">0</span> = <span
                                            class="R">0</span>
                                    </p>
                                    <p class="font-weight-bold mb-0">
                                        R = <span class="R">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Banyak Kelas
                                </div>
                                <div class="card-body">
                                    <p class="border border-primary p-2">
                                        K = 1 + 3.3 log(n)
                                    </p>
                                    <p>
                                        1 + 3.3 log(<span class="n">0</span>)
                                    </p>
                                    <p>
                                        1 + 3.3 (<span class="log_n">0</span>)
                                    </p>
                                    <p>
                                        1 + <span class="log_x_3">0</span> = <span class="K">0</span>
                                    </p>
                                    <p class="font-weight-bold mb-0">
                                        K = <span class="K-pembulatan">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Interval Kelas
                                </div>
                                <div class="card-body">
                                    <p class="border border-primary p-2">
                                        P = R/K
                                    </p>
                                    <p>
                                        <span class="R">0</span>/<span class="K-pembulatan">0</span> = <span
                                            class="P">2.33</span>
                                    </p>
                                    <p class="font-weight-bold mb-0">
                                        P = <span class="P-pembulatan">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card">
                                <div class="card-header">
                                    Tepi Kelas
                                </div>
                                <div class="card-body">
                                    Bawah
                                    <p class="border border-primary p-2">
                                        Tepi bawah = batas bawah - (1 atau 0.5)
                                    </p>
                                    <p>
                                        <span class="x-min">0</span> - <span class="nilai-tambah-kurang">0</span> =
                                        <span class="TB">0</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        Tepi bawah = <span class="TB"></span>
                                    </p>

                                    Atas
                                    <p class="border border-primary p-2">
                                        Tepi atas = batas atas + (1 atau 0.5)
                                    </p>
                                    <p>
                                        <span class="x-max">0</span> + <span class="nilai-tambah-kurang">0</span> =
                                        <span class="TA">0</span>
                                    </p>
                                    <p class="font-weight-bold">
                                        Tepi atas = <span class="TA">0</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="card card-tabel-distribusi">
                                <div class="card-header">
                                    Tabel Distribusi Frekuensi
                                </div>
                                <div class="card-body">
                                    <table id="table-interval" class="table table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col" colspan="2">Kelas</th>
                                                <th scope="col" rowspan="2" class="align-middle">f</th>
                                            </tr>
                                            <tr>
                                                <th>BB</th>
                                                <th>BA</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="d-none">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p class="font-weight-bold">&Sigma;f = <span class="n"></span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    `,
    mounted() {
        /**
        * RUMUS TABEL DISTRIBUSI FREKUENSI
        *
        *
        */
        $('.btn-hasil').click(function () {
            $('.jawaban').removeClass('d-none');
            $('.table tbody .tr').remove();
            let $data = $('.input-data').val();
            $data = $data.trim();
            if (!is_data($data)) {
                $('.alert').removeClass('d-none');
                $('.jawaban-benar-distribusi-frekuensi').addClass('d-none');
                $('.alert').text('Mohon masukan data!!!');
                return;
            }
            $data = explode($data, ',');
            let $banyak_data = $data.length;
            if ($banyak_data <= 1) {
                $('.alert').removeClass('d-none');
                $('.jawaban-benar-distribusi-frekuensi').addClass('d-none');
                $('.alert').text('Harap masukan lebih dari satu data!!!');
                return;
            }
            let $data_valid = data_valid($data);
            if ($data_valid['error']) {
                $('.jawaban-benar-distribusi-frekuensi').addClass('d-none');
                $('.alert').removeClass('d-none');
                $('.alert').text($data_valid['mesage']);
                return;
            }
            $data = $data.sort();
            // tampilkan data terurut
            $('.data').text($data);
            // cari nilai R
            let $x_min = parseFloat($data[0]);
            let $x_max = parseFloat($data[$banyak_data - 1]);
            let $R = $x_max - $x_min;
            $('.x-max').text($x_max);
            $('.x-min').text($x_min);
            $('.R').text($R);
            // cari nilai K (banyak kelas)
            // let $pilihan_nilai_tambah_kurang = $('.pilihan-nilai-tambah-kurang option:selected').text();
            let $pilihan_nilai_tambah_kurang = 1;
            $pilihan_nilai_tambah_kurang = parseFloat($pilihan_nilai_tambah_kurang);
            let $log = Math.log10($banyak_data);
            let $K = 1 + (3.3 * $log);
            let $log_x_3 = 3.3 * $log;
            let $K_bulat = 0;
            if ($pilihan_nilai_tambah_kurang == 1) {
                $K_bulat = Math.round($K);
            } else {
                $K_bulat = Math.ceil($K);
            }
            $('.n').text($banyak_data);
            $('.log_n').text($log.toFixed(4));
            $('.log_x_3').text($log_x_3.toFixed(4));
            $('.K').text($K.toFixed(4));
            $('.K-pembulatan').text($K_bulat);

            // cari nilai interval kelas P
            let $P = $R / $K_bulat;
            let $P_bulat = Math.floor($P);
            if ($P_bulat == 2) {
                $P_bulat = 3;
            }
            $('.P').text($P.toFixed(4));
            $('.P-pembulatan').text($P_bulat)

            // Cari nilai tepi kelas
            let $TB = $x_min - $pilihan_nilai_tambah_kurang;
            let $TA = $x_max + $pilihan_nilai_tambah_kurang;
            $('.nilai-tambah-kurang').text($pilihan_nilai_tambah_kurang);
            $('.TB').text($TB);
            $('.TA').text($TA);

            // menampilkan tabel distribusi
            let $num_rows = 0;
            let $tb = $TB;
            do {
                $tb += $P_bulat;
                $num_rows = $num_rows + 1;
            } while ($tb <= $TA);

            for (let i = 0; i < $num_rows; i++) {
                tambah_baris($('.table'));
            }

            let $batas_bawah = $TB;
            let $batas_atas = 0;
            $('.table').find('tbody .tr').each(function () {
                let $td = $(this).find('td');

                $batas_atas = $batas_bawah + ($P_bulat - 1);


                $td.eq(0).text($batas_bawah);
                $td.eq(1).text($batas_atas);
                // menghitung frekuensi
                let $f = 0;
                for (let i = 0; i < $banyak_data; i++) {
                    if ($data[i] >= $batas_bawah && $data[i] <= $batas_atas) {
                        $f = $f + 1;
                    }
                }
                $td.eq(2).text($f);

                if ($pilihan_nilai_tambah_kurang == 1) {
                    $batas_bawah = $batas_bawah + ($P_bulat);
                } else {
                    $batas_bawah = $batas_bawah + ($P_bulat - 1);
                }
                $('.alert').addClass('d-none');
                $('.jawaban-benar-distribusi-frekuensi').removeClass('d-none');

            });

            // console.log($data);
            // return;
        });
    }

}