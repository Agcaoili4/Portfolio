FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY backend/ContactApi/ContactApi.csproj ./ContactApi/
RUN dotnet restore ./ContactApi/ContactApi.csproj
COPY backend/ContactApi/ ./ContactApi/
RUN dotnet publish ./ContactApi/ContactApi.csproj -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080
ENTRYPOINT ["dotnet", "ContactApi.dll"]
