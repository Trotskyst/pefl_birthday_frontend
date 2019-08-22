export default function BirthdayModify(birthday, todayYear) {
    // вычисляем возраст (age), приводим дату рождения в вид ДД.ММ.ГГГГ
    for (var i = 0; i < birthday.length; i++) {
        var birthArray = birthday[i].birthday.split("-");
        birthday[i].age = todayYear - parseInt(birthArray[0]);
        
        if (birthday[i].link_photo) {
            birthday[i].link_photo =
                "http://pefl.ru/plug.php?p=photo&j="+birthday[i].link_manager+"&z=" + birthday[i].link_photo;
        }

        birthday[i].link_manager =
            "http://pefl.ru/users.php?m=details&id=" + birthday[i].link_manager;

        if (birthday[i].link_team) {
            // var link_team = birthday[i].link_team;
            birthday[i].link_team =
                "http://pefl.ru/" + birthday[i].link_team.replace('!', 'plug.php?p=refl&t=k&j=');
        }

        birthday[i].birthday =
            birthArray[2] + "." + birthArray[1] + "." + birthArray[0];
    }
    return birthday;
}
