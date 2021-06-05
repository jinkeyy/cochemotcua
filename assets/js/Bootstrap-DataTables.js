var mSortingString = [];
var disableSortingColumn = 2;
mSortingString.push({ "bSortable": false, "aTargets": [disableSortingColumn] });
const tableListRequest = ()=>{
    $(async function() {
        var table =  $('#list-request').dataTable({
                "language": {
                    "sSearch": "Tìm kiếm:",
                    "lengthMenu":     "Hiển Thị _MENU_ biểu mẫu",
                    "info":           "Hiển Thị _START_ đến _END_ của _TOTAL_ biểu mẫu",
                    "zeroRecords": "Không tìm thấy biểu mẫu",
                    "paginate": {
                        "first":      "Trang Đầu",
                        "last":       "Trang Cuối",
                        "next":       "Chuyển",
                        "previous":   "Trước"
                    },
                    "infoEmpty":      "Hiển Thị 0 đến 0 của 0 biểu mẫu",
                    "infoFiltered":   "(lọc từ _MAX_  biểu mẫu)",
                },
                "paging": true,
                "ordering": true,
                "info": true,
                "aaSorting": [],
                "orderMulti": true,
                "aoColumnDefs": mSortingString
            });
    });
}
