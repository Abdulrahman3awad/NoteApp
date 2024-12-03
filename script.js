const addBox = document.querySelector(".add-box");
// دي العنصر اللي بضغط عليه عشان أضيف ملاحظة جديدة

const popupBox = document.querySelector(".popup-box");
// دي البوكس اللي بيظهر لما أضغط على الزرار عشان أكتب الملاحظة

let notePopup = document.querySelector(".notePopup");
// ده البوكس اللي بيظهر لما بفتح ملاحظة معينة وأشوف تفاصيلها

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];
// دي الشهور اللي هنستخدمها عشان نعرض التاريخ بتاع الملاحظة

const closeBox = popupBox.querySelector("header .closeBox");
// ده الزرار اللي بقفله لما بخلص كتابة الملاحظة

const titleTag = popupBox.querySelector("input");
// ده الحقل اللي بكتب فيه عنوان الملاحظة

const descTag = popupBox.querySelector("textarea");
// ده الحقل اللي بكتب فيه الوصف أو التفاصيل بتاعة الملاحظة

const addBtn = popupBox.querySelector("button");
// ده الزرار اللي بضغط عليه عشان أحفظ الملاحظة

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
// دي الملاحظات اللي متخزنة في الـlocalStorage، ولو مفيش بجيب مصفوفة فاضية

const menuel = document.querySelector(".iconel");
// ده العنصر الخاص بالأيقونة اللي بتظهر عند ضغط على ملاحظة معينة

const showNotes = () => {
  document.querySelectorAll(".note").forEach((note) => note.remove());
  // بحذف كل الملاحظات اللي معروضة دلوقتي عشان أبدأ من الأول

  notes.forEach((note, index) => {
    // بلف على كل ملاحظة موجودة في المصفوفة عشان أعرضها
    let litag = `<li class="note" onclick="notePopupFun(${index})">
                            <div class="details">
                                <p> ${note.title} </p>
                                <span>${note.description}
                                </span>
                            </div>
                            <div class="bottom-content">
                                <span>${note.date}</span>
                                <div class="settings">
                                    <i onclick=showMenu(this) class="fa-solid fa-ellipsis iconel"></i>
                                    <span onclick=showMenu(this) class="material-symbols-outlined">more_vert</span>
                                    <ul class="menu">
                                        <li onclick="editNote(${index},'${note.title}','${note.description}')"><span class="material-symbols-outlined">edit</span>Edit</li>
                                        <li onclick="deleteNote(${index})"><span class="material-symbols-outlined">delete</span>Delete</li>
                                    </ul>
                                </div>
                            </div>
                     </li>`;
    // هنا بعمل العناصر بتاعة الـHTML اللي بتعرض تفاصيل الملاحظة مع زرار التعديل والحذف

    addBox.insertAdjacentHTML("afterend", litag);
    // بدخل العنصر الجديد اللي عملته تحت زرار الإضافة

    const details = document.querySelectorAll(".details");
    details[index].onclick = () => {
      notePopupFun(index);
      // لما بضغط على أي ملاحظة، بفتح البوكس اللي بيعرض التفاصيل بتاعتها
    };
  });
};

function showMenu(elem) {
  elem.parentElement.classList.add("show");
  // هنا بضيف كلاس عشان أظهر المينيو بتاعة التعديل والحذف

  document.onclick = (e) => {
    if (e.target.tagName != "SPAN" || e.target != elem) {
      elem.parentElement.classList.remove("show");
      // هنا لو ضغطت في أي حتة برا المينيو، بخفيها تاني
    }
  };
  // console.log(elem)
}

function deleteNote(noteId) {
  notes.splice(noteId, 1);
  // بحذف الملاحظة من المصفوفة

  localStorage.setItem("notes", JSON.stringify(notes));
  // بحدث الـlocalStorage عشان أحفظ التغييرات

  showNotes();
  // بعرض الملاحظات تاني بعد الحذف
}

function editNote(noteId, title, description) {
  titleTag.value = title;
  descTag.value = description;
  addBox.click();
  // بفتح البوكس بتاع الإضافة وعبي الحقول بالعنوان والوصف اللي عايز أعدلهم

  deleteNote(noteId);
  // بحذف الملاحظة الأديمة عشان أضيف الجديدة بعد التعديل
}

addBox.onclick = () => popupBox.classList.add("show");
// لما بضغط على زرار الإضافة، بظهر البوكس بتاع إضافة الملاحظة

closeBox.onclick = () => {
  titleTag.value = "";
  descTag.value = "";
  popupBox.classList.remove("show");
  // بقفل البوكس وبتأكد أن الحقول فاضية
};

addBtn.onclick = (e) => {
  e.preventDefault();
  // بمنع الصفحة من أنها تتعمل ريفرش

  let ti = titleTag.value;
  let desc = descTag.value;
  // بخزن القيم اللي في الحقول بتاعة العنوان والوصف

  let currentDate = new Date();
  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  // بجيب التاريخ الحالي

  let noteInfo = {
    title: ti,
    description: desc,
    date: `${day} ${month} ${year}`,
    // بعمل object للملاحظة فيها العنوان والوصف والتاريخ
  };

  notes.push(noteInfo);
  // بضيف الملاحظة الجديدة للمصفوفة

  localStorage.setItem("notes", JSON.stringify(notes));
  // بحفظ الملاحظات في الـlocalStorage

  closeBox.click();
  // بقفل البوكس بتاع الإضافة

  showNotes();
  // بعرض الملاحظات الجديدة بعد إضافة الملاحظة
};

function notePopupFun(index) {
  let objData = JSON.parse(localStorage.getItem("notes"))[index];
  // بجيب الملاحظة اللي ضغطت عليها من الـlocalStorage

  notePopup.classList.add("show");
  // بظهر البوكس اللي فيه تفاصيل الملاحظة

  document.body.style.height = "100vh";
  // بعمل الـbody ياخد ارتفاع الشاشة كله

  notePopup.querySelector(".box").querySelector("h2").textContent =
    objData.title;
  notePopup.querySelector(".box").querySelector("p").textContent =
    objData.description;
  // بعرض العنوان والوصف بتاع الملاحظة

  document.onclick = (e) => {
    if (
      e.target.tagName == "SPAN" ||
      e.target.classList.contains("notePopup")
    ) {
      notePopup.classList.remove("show");
      // لو ضغطت في أي حتة برا البوكس، بخفيه تاني
    }
  };
}

showNotes();
// ببدأ بعرض الملاحظات أول ما الصفحة تفتح
