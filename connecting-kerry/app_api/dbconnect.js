const fs = require('fs');
const pg = require('pg');
const url = require('url');

const config = {
    user: "avnadmin",
    password: "AVNS_CvTWVzyDnlFNp8mKkCR",
    host: "connectingkerry-connecting-kerry.l.aivencloud.com",
    port: 23109,
    database: "defaultdb",
    ssl: {
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUfOMLycjcoOiljC58YAEi66fd2K8wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMjViZjgwNDMtZjA5NC00MTk5LWJlYzEtNGVkNDJkMjFk
NWY5IFByb2plY3QgQ0EwHhcNMjQwNjExMTAyMzU5WhcNMzQwNjA5MTAyMzU5WjA6
MTgwNgYDVQQDDC8yNWJmODA0My1mMDk0LTQxOTktYmVjMS00ZWQ0MmQyMWQ1Zjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBANGuAKUT
eFjBKtc/JGROIVKygUDS3Q3WMSmfxOLwE0Up5kVEazlnvYwvO2Y5EACDQ+EmgiD6
U4PMcIjqm9IuNo877SkFpGSFhdUCxc7/uLQvyaU0cSt4GABz3V0cwssTwFKrtbuX
1p4dI+I1lTx/euDRjNzaKIRoKz1Rh9JeJBs/VZK79gCetKrpGkuKoQJ76gCU0bPx
Idxem0U7hUzxPOmHDMDw1dtjIePORBzjPzlnVUYOtJfZLQisCASl1GtjymthaGuT
V90XtDjXBuKMyfIkJBABW6SRAChH+ztCldkEPAD8+KlxBXlXkIRlXobpywZf6jyS
iBtvQBCpFsNPO1+6RypE4g20CS4EAREoU2V/D5sO98ZBauuldZIRdcbtJt4FZkM/
+vAjB7PXKuLkLhYwbF7fGS4pfPi0OjBD5yAvGJOGcQNQhh+CuzIlzxDJ7c9dToSj
OFwHSvm1RtooEzVk8dXI3VHVh1XHjyl+GPJI3xxdUKgyWuFgLmzWg8J+LQIDAQAB
oz8wPTAdBgNVHQ4EFgQUYmfT8MsZBLlgXFPBspyCes09WLEwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAIPXLW5Fl8rInOT+
wPELO64HJiNyzeFRKPHx9jiGLsX6NZdOS8Mr4Nc7HEUd5UJNA7DQFGpmtukNE5/B
DlsLjWckmPcuspa7m7xuA6kTy2uYogm1JsGTVVRRITBbyiAi1jl+lcJvpD2+nzz9
Xk1zN6HTiXkQZVX4lHMY4tOAU+/TDiKuj/wMJWEmJT8fZ2uqK4pNlZF5+gB/S01X
uOu5FfBY5ZqMdSDPigF/TzWXDratpSEkPvymjwuEZWi4WN9pe0ifhI2ZRNMJoJuA
a44AZ9occFFpl2P9q4IAISESF4Jzw+9urSBX/bchlpjQ7XWb9/G9qbmpSpUHOaSw
zuPsATm7eZheFn13SEldqsHcfcUqaQozw/V/5wcmGm80ThjkAfyGWOCTYrxilKuK
/kqPNy1i2H1Z8nOe5YX1patmUTPiNQtqlR0mHfmVDdVeII4gMhV97tECqqIZ2tDA
fpiFyMU0OFAJnHJBRZjI1d1URs2qXpHibTzsUKpCPdIl9LIz2Q==
-----END CERTIFICATE-----`,
    },
};

const client = new pg.Client(config);
client.connect(function (err) {
    if (err)
        throw err;
    client.query("SELECT VERSION()", [], function (err, result) {
        if (err)
            throw err;

        console.log(result.rows[0].version);
        client.end(function (err) {
            if (err)
                throw err;
        });
    });
});