
export const TidakBerkelompok = {
    template: `
        <div class="col-md-6">
            <div class="accordion" id="accordionExample">
                <div class="card">
                    <div class="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button class="btn btn-link" type="button" data-toggle="collapse"
                                data-target="#dataTabBerkelompok" aria-expanded="false"
                                aria-controls="dataTabBerkelompok">
                                Data Tidak Berkelompok
                            </button>
                        </h5>
                    </div>

                    <div id="dataTabBerkelompok" class="collapse" aria-labelledby="headingOne"
                        data-parent="#accordionExample">
                        <div class="card-body">
                            <form>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1">Masukan Data</label>
                                    <textarea class="form-control input-data"
                                        id="exampleFormControlTextarea1" rows="5"
                                        placeholder="Contoh: 1,2,3,4,5.6 (tanpa spasi)"></textarea>
                                </div>
                            </form>
                            <button class="btn btn-primary btn-tak-berkelompok btn-hasil">Hasil</button>
                            <div class="jawaban-tak-berkelompok d-none">
                                <hr>
                                <div class="alert alert-tak-berkelompok alert-danger d-none" role="alert">
                                </div>
                                <div class="jawaban-benar-tak-berkelompok text-center d-none">
                                    <div class="card card-data mb-3">
                                        <div class="card-header">
                                            Data
                                        </div>
                                        <div class="card-body text-left data-distribusi-f">
                                            <span class="data"></span>
                                        </div>
                                    </div>
                                    <div class="ganjil">
                                        <span>Data ganjil</span>
                                        <p class="border border-primary p-2">
                                            Median = X<sub>K+1</sub>
                                        </p>
                                        <p>
                                            K = (n-1)/2
                                        </p>
                                        <p>
                                            K = (<span class="n">0</span>-1)/2
                                        </p>
                                        <p class="font-weight-bold">
                                            K = <span class="K">0</span>
                                        </p>
                                        <p>
                                            Median = X<sub><span class="K">0</span>+1</sub>
                                        </p>
                                        <p class="font-weight-bold">
                                            Med = X<sub><span class="med">0</span></sub> = <span
                                                class="MED">0</span>
                                        </p>
                                    </div>
                                    <div class="genap">
                                        <span>Data genap</span>
                                        <p class="border border-primary p-2">
                                            Median = 1/2 (X<sub>K</sub> + X<sub>K+1</sub>)
                                        </p>
                                        <p>
                                            K = n/2
                                        </p>
                                        <p>
                                            K = <span class="n">0</span>/2
                                        </p>
                                        <p class="font-weight-bold">
                                            K = <span class="K">0</span>
                                        </p>
                                        <p>
                                            Median = 1/2 (X<span class="K"><sub>0</sub></span> + X<sub><span
                                                    class="K">0</span>+1</sub>)
                                        </p>
                                        <p>
                                            1/2 (X<sub><span class="K">0</span></sub> + X<sub><span
                                                    class="K">0</span>+1</sub>)
                                        </p>
                                        <p>
                                            1/2 (X<sub><span class="K">0</span></sub> + X<sub><span
                                                    class="Kplus1">0</span></sub>)
                                        </p>
                                        <p>
                                            1/2 (<span class="XK">0</span> + <span class="XKplus1">0</span>)
                                        </p>
                                        <p>
                                            1/2 (<span class="XKKplus1">0</span>)
                                        </p>
                                        <p class="font-weight-bold">
                                            Med = <span class="MED">0</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted() {
        // aksi data tak berkelompok
        // let $number = /^[0-9.]+$/;

        $('.btn-tak-berkelompok').click(function () {
            $('.jawaban-tak-berkelompok').removeClass('d-none');
            let $data = $('.input-data').val();
            $data = $data.trim();

            if (!is_data($data)) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text('Mohon masukan data!!!')
                return;
            }
            $data = explode($data, ',');
            let $banyak_data = $data.length;
            if ($banyak_data <= 1) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text('Harap masukan lebih dari satu data!!!');
                return;
            }

            let $data_valid = data_valid($data); //periksa kelayakan data
            if ($data_valid['error']) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text($data_valid['mesage']);
                return;
            }

            $data = $data.sort(function (a, b) { return a - b }); //urutkan data secara ascesnding
            $('.data').text($data); //tampilkan data pada card data


            if ($banyak_data % 2 != 0) {
                // ganjil
                let $K = ($banyak_data - 1) / 2;
                let $med = $K + 1;
                let $MED = $med - 1;
                $('.ganjil .n').text($banyak_data);
                $('.ganjil .K').text($K);
                $('.ganjil .med').text($med);
                $('.ganjil .MED').text($data[$MED]);
                $('.ganjil').removeClass('d-none');
                $('.genap').addClass('d-none');
            }
            else {
                // genap
                let $K = $banyak_data / 2;
                let $XKKplus1 = parseFloat($data[$K - 1]) + parseFloat($data[$K]);
                let $MED = $XKKplus1 / 2;
                $('.genap .n').text($banyak_data);
                $('.genap .K').text($K);
                $('.genap .Kplus1').text(($K + 1));
                $('.genap .XK').text($data[$K - 1]);
                $('.genap .XKplus1').text($data[$K]);
                $('.genap .XKKplus1').text($XKKplus1);
                $('.genap .MED').text($MED);
                $('.genap').removeClass('d-none');
                $('.ganjil').addClass('d-none');
            }
            $('.jawaban-benar-tak-berkelompok').removeClass('d-none');
            $('.alert-tak-berkelompok').addClass('d-none');
        });
    }
}