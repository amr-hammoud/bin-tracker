import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorage {
  final storage = FlutterSecureStorage();

  Future<void> writeStorage(String _key, dynamic _value) async {
    await storage.write(key: _key, value: _value.toString());
  }

  Future<String?> readStorage(String _key) async {
    try {
      return await storage.read(key: _key);
    } catch (err) {
      print(err);
      return null;
    }
  }
}
