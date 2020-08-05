//チームドライブの一覧を取得する（ID含む）
function listAllTeamDriveRoles(){
  //変数の宣言
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();  
  var pageToken
  var rows = [];
  var teamDrives;
  var permissions ;
  var pageToken2;
  
  // Push column name
  rows.push(['teamDriveName','TeamDriveID','MailAddress','Role']);
  
  //管理者リストを取得する
  do{
    teamDrives = Drive.Drives.list({pageToken:pageToken,maxResults:100,useDomainAdminAccess:true})
      for (var i = 0; i < teamDrives.items.length; i++) {
        //ドライブ一覧情報を変数に格納する
        var teamDrive = teamDrives.items[i];
        // Create cols => Push row
        
        
        
  //管理者一覧を取得する
  do{
    permissions = Drive.Permissions.list(teamDrive.id, {maxResults:100,pageToken:pageToken2,supportsAllDrives:true,useDomainAdminAccess:true}) ;
      for (var j = 0; j < permissions.items.length; j++) {
        //管理者権限一覧を変数に格納する
        var permission = permissions.items[j];
            var cols = [];
            cols.push(teamDrive.name);
            cols.push(teamDrive.id);
            cols.push(permission.emailAddress);
            cols.push(permission.role);
            rows.push(cols);
            sheet.getRange(1, 1, rows.length, 4).setValues(rows);
    }
 
    //次のページのpageTokenを取得する
    pageToken2 = permissions.nextPageToken;
  }while(pageToken2)
      }
    //次のページのpageTokenを取得する
    pageToken = teamDrives.nextPageToken
  }while(pageToken)
  //チームドライブ一覧表示
}



/**
 * On open function
 * - Create menu to get list.
 */
function onOpen() {
  SpreadsheetApp.getUi()
  .createMenu("管理")
  .addItem("チームドライブ棚卸し", "listAllTeamDriveRoles")
  .addToUi();
}