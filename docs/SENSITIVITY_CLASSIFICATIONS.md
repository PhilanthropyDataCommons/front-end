# Data Sensitivity Classifications for Base Fields

See below descriptions for the different sensitivity classifications for base fields in the pdc service.

## Public

Data that can typically be found in public records or in semi-public aggregation services. For example: organization name, tax ID number, mission statement, etc.
Note that a field having a sensitivity classification of "Public" does not mean that the field's value is automatically visible to everyone. Fields with this classification are still subject to the PDC Framework permissions system. If an organization chooses to hide everything, including even its name, from most users of the PDC, then the PDC will respect that choice. The
"Public" sensitivity classification just tells the PDC framework what sensitivity (confidentiality) that field should have in the absence of any other guiding access controls.


## Restricted


Data that the PDC would not normally expect to be public, and that by default would only be shown to a user when the owner of the data has configured permissions to allow such sharing.
Some examples of "Restricted" data would be the specifics of proposals that an organization has submitted for
consideration, or a staff member's phone number.

## Forbidden
Data that the PDC categorically refuses to store. Any attempt to store data in a field with the "Forbidden" sensitivity classification will be refused, and (as an additional safeguard) even if such data were somehow to be present the PDC will also not include it in the response to any request.
Furthermore, fields marked as "Forbidden" are not even listed by default in requests for a list of the fields available for use in the PDC (although the requestor can include an additional parameter on the request in order to have them included).
The only reason this sensitivity classification exists at all is so that the PDC can remember what fields we have decided are too sensitive to store, and so that anyone who want to see a record of those decisions can do so. Further details about this are available in ticket [#1621](https://github.com/PhilanthropyDataCommons/service/issues/1621).
