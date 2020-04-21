export var Mixin = {
    mounted() {
        var $TABLE = $('#table');
        var $table_interval = $('#table-interval');

        // tambah baris
        $('.btn-table-add').click(function () {
            tambah_baris($TABLE);
        });
        // tambah baris kelas interval
        $('.btn-table-interval-add').click(function () {
            tambah_baris($table_interval);
        });

        // hapus baris
        $('tr .x-row').on('click', function () {
            let tr = $(this);
            hapus_baris(tr);
        });
        // hapus baris interval
        $('tr .x-row-interval').on('click', function () {
            let tr = $(this);
            hapus_baris(tr);
        });
    }
}