const Utils = {

    create_entry_id : function(id_prefix="", id_suffix="") {
        const values = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        //let id_prefix = "ZAK_"; // Ein Prefix vor die ID. Koennte ggf spaeter interssant sein
        //let id_suffix = "_Ende"; // Ein Suffix NACH der eigentlichen ID. Koennte ggf spaeter interssant sein
        let new_id = id_prefix;
        //die id soll 10 Stellen umfassen
        let id_length = 10;
        for (let i = 0; i < id_length; i++) {
          let rand_id = Math.floor(Math.random() * values.length);
          new_id = new_id + values.charAt(rand_id);
        }
        new_id = new_id + id_suffix;
        return new_id;
        }
      }
    
      export { Utils }