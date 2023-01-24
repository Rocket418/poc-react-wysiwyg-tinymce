import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import "../Tiny/Editor__Styles.css"

async function verifyPermissions(handle) {
  if (await handle.queryPermission({ mode: 'readwrite' }) === 'granted') {
    return true;
  }
  if (await handle.requestPermission({ mode: 'readwrite' }) === 'granted') {
    return true;
  }
  return false;
}

export default function EditorComponent(props) {
  const fileHandle = null;

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  async function saveFile() {
  var saveValue = editorRef.current.getContent();
  if (!fileHandle) {
    try {
      fileHandle = await window.showSaveFilePicker({
        suggestedName: 'test_uniforme_azul',
        types: [{
          description: 'TEXTO PLANO!!',
          accept: {'text/html': ['.html']},
        }],
      });
    } catch (e) {
      // might be user canceled
    }
  }
  if (!fileHandle || !await verifyPermissions(fileHandle)) {
    return;
  }
  let writableStream = await fileHandle.createWritable();
  await writableStream.write(saveValue);
  await writableStream.close();
}

  const save = ev => {
    // console.log(ev);
    ev.preventDefault();
    // saveFile();

    const result = editorRef.current.getContent();
    // console.log(result);

    props.editedResponse(result);

  }
  const isSmallScreen = window.matchMedia("(max-width: 1023.5px)").matches;

  const useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <section>
    <h1>Hola Admin, vas a editar: "insertar test"</h1>
    <form>
      <Editor
        apiKey="7v1e6x9jdvuh68elzfbx9y82ipi3g9akrjzhlh8kc0cx79gg"
        onInit={(evt, editor) => (editorRef.current = editor)}
        // INVESTIGAR COMO VOLCAR LA INFO DE LOS TEST A LA CAJA DE TEXTO 
        initialValue={props.defaultValue}
        init={{
          height: 900,
          editimage_cors_hosts: ["picsum.photos"],
          menubar: "file edit view insert format tools table help",
          plugins: [
            "advlist",
            "anchor",
            "autolink",
            "autosave",
            "charmap",
            "code",
            "codesample",
            "directionality",
            "emoticons",
            "fullscreen",
            "help",
            "image",
            "imagetools",
            "editimage",
            "importcss",
            "insertdatetime",
            "link",
            "lists",
            "media",
            "nonbreaking",
            "pagebreak",
            "preview",
            "quickbars",
            "save",
            "searchreplace",
            "template",
            "table",
            "visualblocks",
            "visualchars",
            "wordcount",
          ],
          toolbar:
            "undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify lineheight | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile quickimage media template link anchor codesample | ltr rtl",
          content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          toolbar_sticky: false,
          toolbar_sticky_offset: isSmallScreen ? 102 : 108,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_prefix: "{path}{query}-{id}-",
          autosave_restore_when_empty: false,
          autosave_retention: "2m",
          image_advtab: true,
          save_enablewhendirty: true,
//           save_onsavecallback: () => {
//     console.log('Saved');
//   },
          link_list: [
            { title: "My página 1", value: "https://www.uniformeazul.com" },
            { title: "My pagina 2", value: "http://www.moxiecode.com" },
          ],
          image_list: [
            { title: "Mi imagen 1", value: "../../../public/logo192.png" },
            { title: "Mi imagen 2", value: "http://www.moxiecode.com" },
          ],
          image_class_list: [
            { title: "Título", value: "" },
            { title: "Alguna clase", value: "class-name" },
          ],
          importcss_append: true,

          file_picker_callback: (callback, value, meta) => {
            /* Provide file and text for the link dialog */
            if (meta.filetype === "file") {
              callback("https://www.google.com/logos/google.jpg", { text: "My text" });
            }

            /* Provide image and alt text for the image dialog */
            if (meta.filetype === "image") {
              callback("https://www.google.com/logos/google.jpg", { alt: "My alt text" });
            }

            /* Provide alternative source and posted for the media dialog */
            if (meta.filetype === "media") {
              callback("movie.mp4", {
                source2: "alt.ogg",
                poster: "https://www.google.com/logos/google.jpg",
              });
            }
          },
          templates: [
            {
              title: "New Table",
              description: "creates a new table",
              content:
                '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>',
            },
            {
              title: "Starting my story",
              description: "A cure for writers block",
              content: "Once upon a time...",
            },
            {
              title: "New list with dates",
              description: "New List with dates",
              content:
                '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>',
            },
          ],
          template_cdate_format: "[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]",
          template_mdate_format: "[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]",
          image_caption: true,
          quickbars_selection_toolbar:
            "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
          noneditable_class: "mceNonEditable",
          toolbar_mode: "sliding",
          contextmenu: "link image table",
          skin: useDarkMode ? "oxide-dark" : "oxide",
          content_css: useDarkMode ? "dark" : "default",
          //   content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
        }}

      />
      <button name="submitbtn" onClick={save}>GUARDAR YESS</button>
      <button className="btn2" onClick={log}>Guardar cambios</button>
      </form>

      {/* Necesitamos ver qué es y para qué  funciona el useRef -- lineas 6-11. Y darle la funncionalidad de guardar cambios. */}
      {/* <button className="btn1" onClick={log}>Log editor content</button>
      <button className="btn2 submitbtn" onClick={log}>Guardar cambios</button> */}

    </section>
  );
}
