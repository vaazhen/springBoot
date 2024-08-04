$(document).ready(function () {
console.log("hello");
    $.ajax({
        url: "/admin/users",

        success: function (result) {
            result.forEach(function (user) {
                $("#adminUsersTable").append("<tr> " +
                    "<td>" + user.id + "</td>" +
                    " <td>" + user.username + "</td>" +
                    " <td>" + user.email + "</td>" +
                    " <td>" + user.age + "</td>" +
                    " <td>" + user.roles.map(x => x.name).join(", ") + "</td>" +
                    '<td>' +
                    '<button type="button" id = "edit" class="btn btn-info"  style="color: white" data-toggle="modal"  >Изменить  </button> ' +
                    '</td>' +
                    '<td>' +
                    '<button type="button" id = "delete" class="btn btn-danger"  style="color: white" data-toggle="modal" >Удалить </button>' +
                    '</td>' +
                    " </tr> "
                )
                ;
            });


        }
    });
    $('#adminUsersTable').on('click', '#edit', function (event) {
        console.log(event);
        $("#modalEdit").show();
        let id = $(this).closest('tr').find('td:first').text();
        let username = $(this).closest('tr').find('td:nth-child(2)').text();
        let email = $(this).closest('tr').find('td:nth-child(3)').text();
        let age = $(this).closest('tr').find('td:nth-child(4)').text();
        $("#roleUp").empty();
        $.ajax({
            url: "/admin/roles",
            success: function (result) {
                result.forEach(function (role) {
                    $("#roleUp").append('<option value="' + role + '">' + role + '</option>');
                });
            }
        })
        $("#idUp").val(id);
        $("#usernameUp").val(username);
        $("#emailUp").val(email);
        $("#ageUp").val(age);
        console.log(id);


    });
    $('.closeEdit').on('click',function (event) {
        console.log(event);
        $("#modalEdit").hide();
        $("#deleteModal").hide();
    });
    $('#submitEdit').on('click',function (event) {
        console.log(event);
        $.ajax({
            url: "/admin/update",
            data: {
                id: $("#id").val(),
                username: $("#username").val(),
                password: $("#password").val(),
                email: $("#email").val(),
                age: $("#age").val(),
                roles: $("#roles").val()
            },
            success: function( result ) {
                $( "#weather-temp" ).html( "<strong>" + result + "</strong> degrees" );
            }
        });
        $("#modalEdit").hide();
    });
    $('#adminUsersTable').on('click', '#delete', function (event) {
        $("#deleteModal").show();
        let id = $(this).closest('tr').find('td:first').text();
        let username = $(this).closest('tr').find('td:nth-child(2)').text();
        let email = $(this).closest('tr').find('td:nth-child(3)').text();
        let age = $(this).closest('tr').find('td:nth-child(4)').text();
        let roles = $(this).closest('tr').find('td:nth-child(5)').text();
        $("#delRole").empty();
                roles.split(", ").forEach(function (role) {
                    $("#delRole").append('<option value="' + role + '">' + role + '</option>');
                });
        $("#idDelete").val(id);
        $("#nameDelete").val(username);
        $("#emailDelete").val(email);
        $("#ageDelete").val(age);
        console.log(id);
    });


});

