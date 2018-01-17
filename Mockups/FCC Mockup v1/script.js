// https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js

$(()=>{

  let $nMap =       $("a[href='#map']"),
      $nCommunity = $("a[href='#community']"),
      $nDonate =    $("a[href='#donate']"),
      $nSettings =  $("a[href='#settings']"),
      $nLesson =    $("a[href='#lesson']"),
      $nEditor =    $("a[href='#editor']"),
      $nPreview =   $("a[href='#preview']"),
      $map =        $("#map"),
      $editor =     $("#editor"),
      $lesson =     $("#lesson"),
      $preview =    $("#preview");

  $nMap.click(()=>{
    $nMap.toggleClass("on");
    $map.toggle();
  });
  $nEditor.click(()=>{
    $nEditor.toggleClass("on");
    $editor.toggle();
  });
  $nLesson.click(()=>{
    $nLesson.toggleClass("on");
    $lesson.toggle();
  });
  $nPreview.click(()=>{
    $nPreview.toggleClass("on");
    $preview.toggle();
  });

});