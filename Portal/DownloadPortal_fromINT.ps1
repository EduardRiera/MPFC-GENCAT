#############################################################################################################################
# Autor: Avanade
# Create on: 20/06/2023
# Modified by:
# Modified on:
#############################################################################################################################
Clear-Host

Write-Host -ForegroundColor DarkRed "#############################################################################################################################"
Write-Host -ForegroundColor DarkRed "#                                                       AVANADE                                                             #"
Write-Host -ForegroundColor DarkRed "#############################################################################################################################"

#Declarations
$integracionUrl = "https://integracio-eco-mpfc.crm4.dynamics.com/"
$sourceUser = "GGMZNT0003@gencat.cat"
$sourcePassword = "Avanade2023$"
$integracionWebsiteId = "bc82a5af-c8b2-ed11-83ff-000d3adf796b"

#############################################################################################################################
#                                       Acciones sobre Portals
#############################################################################################################################

pac auth create -u $integracionUrl -un $sourceUser -p $sourcePassword
Write-Host
Write-Host "#############################################################################################################################"
Write-Host
pac paportal download --path ".\" --webSiteId $integracionWebsiteId -o

Write-Host -ForegroundColor Red "Ejecucion finalizada"
Write-Host "Press Enter to continue..."
Read-Host