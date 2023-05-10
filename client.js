import { CallClient, CallAgent } from "@azure/communication-calling";
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from "@azure/communication-common";
import { CommunicationIdentityClient } from "@azure/communication-identity";

let calls = []; // Store ongoing calls in an array
let callAgent;

const calleePhoneInput = document.getElementById("callee-phone-input");
const callPhoneButton = document.getElementById("call-phone-button");
const callsContainer = document.getElementById("calls-container");

async function init() {
  const connectionString =
    "endpoint=https://helpcenter1.communication.azure.com/;accesskey=tGH/POk6CTxYKe6MJrafVMoqfMA1z4v2VnNGdGjY7y50Lu6GGCi/qk3e5xojt7sR9/IwY84LiZT2QElgxnOApw==";
  const identityClient = new CommunicationIdentityClient(connectionString);
  const user = await identityClient.createUser();
  const tokenResponse = await identityClient.getToken(user, ["voip"]);
  const tokenCredential = new AzureCommunicationTokenCredential(
    tokenResponse.token
  );

  const callClient = new CallClient();
  callAgent = await callClient.createCallAgent(tokenCredential);
}

init();

callPhoneButton.addEventListener("click", () => {
  const phoneNumbers = calleePhoneInput.value
    .split("\n")
    .map((num) => num.trim());

  phoneNumbers.forEach((phoneToCall) => {
    if (phoneToCall === "") return;

    const call = callAgent.startCall([{ phoneNumber: phoneToCall }], {
      alternateCallerId: { phoneNumber: "+18772190592" },
    });
    calls.push(call); // Add the new call to the calls array

    // Create a call-info div for displaying the call information
    const callInfoDiv = document.createElement("div");
    callInfoDiv.textContent = `Call to ${phoneToCall}: `;
    callsContainer.appendChild(callInfoDiv);

    // Create a hang up button for the new call
    const hangUpPhoneButton = document.createElement("button");
    hangUpPhoneButton.textContent = "Hang Up";
    hangUpPhoneButton.addEventListener("click", () => {
      endCall(calls.indexOf(call)); // End the call by its index in the calls array
      callsContainer.removeChild(callInfoDiv); // Remove the call info div from the calls container
    });

    callInfoDiv.appendChild(hangUpPhoneButton); // Add the hang up button to the call-info div
  });
});

function endCall(index) {
  if (index >= 0 && index < calls.length) {
    calls[index].hangUp({ forEveryone: true });
    calls.splice(index, 1); // Remove the call from the calls array
  }
}
