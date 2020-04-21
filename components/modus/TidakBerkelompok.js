

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
                                    <table class="table tabel-tak-berkelompok table-bordered text-center">
                                        <thead>
                                            <tr>
                                                <th scope="col">X</th>
                                                <th scope="col" class="align-middle">f</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr class="d-none">
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
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
        $('.btn-tak-berkelompok').click(function () {
            $('.tabel-tak-berkelompok .tr').remove();
            $('.jawaban-tak-berkelompok').removeClass('d-none');
            let $data = $('.input-data').val(); //mengambil data inputan
            $data = $data.trim();

            if (!is_data($data)) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text('Mohon masukan data!!!');
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
            let $data_valid = data_valid($data);
            if ($data_valid['error']) {
                $('.jawaban-benar-tak-berkelompok').addClass('d-none');
                $('.alert-tak-berkelompok').removeClass('d-none');
                $('.alert-tak-berkelompok').text($data_valid['mesage']);
                return;
            }
            $data = $data.sort(function (a, b) { return a - b });
            let $data_x_tersaring = new Array();
            let $data_f_tersaring = new Array();
            for (let i = 0; i < $banyak_data; i++) {
                if ($data_x_tersaring.indexOf($data[i]) === -1) {
                    let $index = $data_x_tersaring.length;
                    let $frek_i = 0;
                    for (let j = 0; j < $banyak_data; j++) {
                        if ($data[i] == $data[j]) {
                            $frek_i++;
                        }
                    }
                    $data_x_tersaring[$index] = $data[i];
                    $data_f_tersaring[$index] = $frek_i;
                }
            }

            let $mod = Math.max.apply(Math, $data_f_tersaring);

            for (let i = 0; i < $data_x_tersaring.length; i++) {
                tambah_baris($('.tabel-tak-berkelompok'));
            }

            $('.tabel-tak-berkelompok').find('.tr').each(function (i, e) {
                let $td = $(this).find('td');
                $td.eq(0).text($data_x_tersaring[i]); //data X 
                $td.eq(1).text($data_f_tersaring[i]); //data f
                if ($data_f_tersaring[i] == $mod) {
                    $(this).addClass('alert-success')
                }
            });

            $('.jawaban-benar-tak-berkelompok').removeClass('d-none');
            $('.alert-tak-berkelompok').addClass('d-none');

        });
    }
}