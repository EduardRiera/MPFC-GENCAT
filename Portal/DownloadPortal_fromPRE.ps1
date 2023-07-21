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
$preproduccionUrl = "https://preproduccio-eco-mpfc.crm4.dynamics.com/"
$sourceUser = "GGMZNT0003@gencat.cat"
$sourcePassword = "Avanade2023$"
$preproduccionWebsiteId = "b40aeecf-7ae3-ed11-a7c7-002248a0708a"

#############################################################################################################################
#                                       Acciones sobre Portals
#############################################################################################################################

pac auth create -u $preproduccionUrl -un $sourceUser -p $sourcePassword
Write-Host
Write-Host "#############################################################################################################################"
Write-Host
pac paportal download --path ".\" --webSiteId $preproduccionWebsiteId -o

Write-Host -ForegroundColor Red "Ejecucion finalizada"
Write-Host "Press Enter to continue..."
Read-Host