"use strict";
window.addEventListener("load", main);

const endpoint =
  "https://gallopgalore-80085-default-rtdb.europe-west1.firebasedatabase.app/";

function main() {
  /* ========== EVENT LISTENERS ========== */
  //I am aware that these probably need to be placed elsewhere,
  //but I don't know where would be the best, so they are just here for now
  const cancelButtonInDialogDelete = document.querySelector(
    "#cancelButtonInDialogDelete"
  );
  cancelButtonInDialogDelete.addEventListener("click", closeDialogDelete);
}

/* ========== UPDATE ========== */
// Sends put request to endpoint with horse object
async function updateHorse(horse, endpoint) {
  try {
    const response = await fetch(`${endpoint}horses/${horse.id}.json`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(horse),
    });
    if (response.ok) {
      console.log("Horse updated successfully!");
    }
  } catch (err) {
    throw new Error(`Error at updateHorse: ${err}`);
  }
}

/* ========== Data preparation for getHorses ========== */
// use in getHorses to change the fetched data from object to array.
function prepareData(obj) {
  const dataArr = [];
  for (const key in obj) {
    const horse = obj[key];
    horse["id"] = key;
    dataArr.push(horse);
  }
  return dataArr;
}

/* ========== DELETE ========== */
//This function serves to delete a post in the horse grid.
//The function also calls the updateGrid() function to update the grid afterwards.

async function deleteHorse(horseID) {
  const response = await fetch(`${endpoint}/horses/${horseID}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    console.log(`Deleted horse with ID: ${horseID}`);
    const deleteDialog = document.querySelector("#dialogDelete");
    deleteDialog.close();
    updateGrid();
  }
}

/* ========== DELETE ========== */
//This function closes the delete dialog when the cancel button is clicked.
//This function is called in the main function by an evenlistener.

function closeDialogDelete() {
  const dialogDelete = document.querySelector("#dialogDelete");
  dialogDelete.close();
}
