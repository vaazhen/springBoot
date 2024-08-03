$(document).ready(function () {

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
        let roles = $(this).closest('tr').find('td:nth-child(5)').text();
        $("#idUp").val(id);
        $("#usernameUp").val(username);
        $("#emailUp").val(email);
        $("#ageUp").val(age);
        $("#rolesUp").val(roles);
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
    $('#submitDelete').on('click',function (event) {
        console.log(event);
        $.ajax({
            url: "/admin/delete/{id}",
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


});

