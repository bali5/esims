del /S /Q *.cs

cd ..

dotnet ef --startup-project ../eSims/ migrations add Initialize --context ApplicationContext
dotnet ef --startup-project ../eSims/ migrations add Initialize --context BuildingContext
dotnet ef --startup-project ../eSims/ migrations add Initialize --context CommonContext
